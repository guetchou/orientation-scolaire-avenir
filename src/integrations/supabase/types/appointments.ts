
export type Appointment = {
  id: string;
  conseiller_id: string;
  student_id: string;
  date: string;
  time: string;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  updated_at: string;
};

export type AppointmentInsert = Omit<Appointment, "id" | "created_at" | "updated_at">;
