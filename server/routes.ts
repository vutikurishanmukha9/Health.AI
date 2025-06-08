import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { insertConsultationSchema, insertPrescriptionImageSchema } from "@shared/schema";
import { analyzeHealthData } from "./lib/openai";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new consultation
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      
      // For demo purposes, using a default user ID
      const userId = 1;
      
      const consultation = await storage.createConsultation({
        ...validatedData,
        userId
      });
      
      res.json(consultation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Upload prescription image
  app.post("/api/consultations/:id/upload", upload.single('prescription'), async (req, res) => {
    try {
      const consultationId = parseInt(req.params.id);
      
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageData = {
        consultationId,
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      };

      const prescriptionImage = await storage.createPrescriptionImage(imageData);
      
      // Update consultation with prescription URL
      await storage.updateConsultation(consultationId, {
        prescriptionUrl: `/uploads/${req.file.filename}`
      });

      res.json(prescriptionImage);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Analyze consultation data and generate treatment plans
  app.post("/api/consultations/:id/analyze", async (req, res) => {
    try {
      const consultationId = parseInt(req.params.id);
      const consultation = await storage.getConsultation(consultationId);
      
      if (!consultation) {
        return res.status(404).json({ error: "Consultation not found" });
      }

      // Update status to analyzing
      await storage.updateConsultation(consultationId, { status: "analyzing" });

      // Get prescription images if any
      const images = await storage.getPrescriptionImagesByConsultation(consultationId);
      
      // Prepare data for AI analysis
      const analysisData = {
        prescriptionText: consultation.prescriptionText || '',
        symptoms: consultation.symptoms || '',
        voiceTranscript: consultation.voiceTranscript || '',
        prescriptionImages: images
      };

      // Call OpenAI for analysis
      const analysisResult = await analyzeHealthData(analysisData);

      // Update consultation with results
      const updatedConsultation = await storage.updateConsultation(consultationId, {
        allopathicPlan: analysisResult.allopathicPlan,
        ayurvedicPlan: analysisResult.ayurvedicPlan,
        status: "completed"
      });

      res.json({
        consultation: updatedConsultation,
        analysis: analysisResult
      });
    } catch (error: any) {
      console.error("Analysis error:", error);
      
      // Update status to indicate error
      await storage.updateConsultation(parseInt(req.params.id), { status: "error" });
      
      res.status(500).json({ error: "Failed to analyze consultation data" });
    }
  });

  // Get consultation by ID
  app.get("/api/consultations/:id", async (req, res) => {
    try {
      const consultationId = parseInt(req.params.id);
      const consultation = await storage.getConsultation(consultationId);
      
      if (!consultation) {
        return res.status(404).json({ error: "Consultation not found" });
      }

      const images = await storage.getPrescriptionImagesByConsultation(consultationId);
      
      res.json({
        ...consultation,
        prescriptionImages: images
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get user consultations
  app.get("/api/users/:userId/consultations", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const consultations = await storage.getConsultationsByUser(userId);
      
      res.json(consultations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    next();
  }, require('express').static(path.join(process.cwd(), 'uploads')));

  const httpServer = createServer(app);
  return httpServer;
}
