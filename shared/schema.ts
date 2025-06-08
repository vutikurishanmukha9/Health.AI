import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  prescriptionUrl: text("prescription_url"),
  prescriptionText: text("prescription_text"),
  symptoms: text("symptoms"),
  voiceTranscript: text("voice_transcript"),
  allopathicPlan: jsonb("allopathic_plan"),
  ayurvedicPlan: jsonb("ayurvedic_plan"),
  status: text("status").notNull().default("pending"), // pending, analyzing, completed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prescriptionImages = pgTable("prescription_images", {
  id: serial("id").primaryKey(),
  consultationId: integer("consultation_id").references(() => consultations.id),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  extractedText: text("extracted_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).pick({
  prescriptionText: true,
  symptoms: true,
  voiceTranscript: true,
}).partial();

export const insertPrescriptionImageSchema = createInsertSchema(prescriptionImages).pick({
  filename: true,
  originalName: true,
  mimetype: true,
  size: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type InsertPrescriptionImage = z.infer<typeof insertPrescriptionImageSchema>;
export type PrescriptionImage = typeof prescriptionImages.$inferSelect;

export interface TreatmentPlan {
  type: 'allopathic' | 'ayurvedic';
  title: string;
  description: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    purpose: string;
  }>;
  lifestyle: string[];
  duration: string;
  precautions: string[];
  followUp: string;
}

export interface AnalysisResult {
  allopathicPlan: TreatmentPlan;
  ayurvedicPlan: TreatmentPlan;
  confidence: number;
  analysis: string;
}
