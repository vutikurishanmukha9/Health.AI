import { 
  users, 
  consultations, 
  prescriptionImages,
  type User, 
  type InsertUser,
  type Consultation,
  type InsertConsultation,
  type PrescriptionImage,
  type InsertPrescriptionImage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Consultation operations
  getConsultation(id: number): Promise<Consultation | undefined>;
  getConsultationsByUser(userId: number): Promise<Consultation[]>;
  createConsultation(consultation: InsertConsultation & { userId: number }): Promise<Consultation>;
  updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined>;

  // Prescription image operations
  createPrescriptionImage(image: InsertPrescriptionImage & { consultationId: number }): Promise<PrescriptionImage>;
  getPrescriptionImagesByConsultation(consultationId: number): Promise<PrescriptionImage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private consultations: Map<number, Consultation>;
  private prescriptionImages: Map<number, PrescriptionImage>;
  private currentUserId: number;
  private currentConsultationId: number;
  private currentImageId: number;

  constructor() {
    this.users = new Map();
    this.consultations = new Map();
    this.prescriptionImages = new Map();
    this.currentUserId = 1;
    this.currentConsultationId = 1;
    this.currentImageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  async getConsultationsByUser(userId: number): Promise<Consultation[]> {
    return Array.from(this.consultations.values()).filter(
      (consultation) => consultation.userId === userId,
    );
  }

  async createConsultation(consultation: InsertConsultation & { userId: number }): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const newConsultation: Consultation = {
      ...consultation,
      id,
      prescriptionUrl: null,
      allopathicPlan: null,
      ayurvedicPlan: null,
      status: "pending",
      createdAt: new Date()
    };
    this.consultations.set(id, newConsultation);
    return newConsultation;
  }

  async updateConsultation(id: number, updates: Partial<Consultation>): Promise<Consultation | undefined> {
    const consultation = this.consultations.get(id);
    if (!consultation) return undefined;

    const updatedConsultation = { ...consultation, ...updates };
    this.consultations.set(id, updatedConsultation);
    return updatedConsultation;
  }

  async createPrescriptionImage(image: InsertPrescriptionImage & { consultationId: number }): Promise<PrescriptionImage> {
    const id = this.currentImageId++;
    const newImage: PrescriptionImage = {
      ...image,
      id,
      extractedText: null,
      createdAt: new Date()
    };
    this.prescriptionImages.set(id, newImage);
    return newImage;
  }

  async getPrescriptionImagesByConsultation(consultationId: number): Promise<PrescriptionImage[]> {
    return Array.from(this.prescriptionImages.values()).filter(
      (image) => image.consultationId === consultationId,
    );
  }
}

export const storage = new MemStorage();
