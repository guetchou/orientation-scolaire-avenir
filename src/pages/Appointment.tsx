import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppointmentScheduler } from '@/components/appointments/AppointmentScheduler';
import { mockCounselors } from './Conseillers';

export default function Appointment() {
  const [selectedCounselor, setSelectedCounselor] = useState(mockCounselors[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [appointmentType, setAppointmentType] = useState<'online' | 'inPerson'>('online');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [step, setStep] = useState(1);

  const handleCounselorSelect = (counselorId: string) => {
    const counselor = mockCounselors.find(c => c.id === counselorId);
    if (counselor) {
      setSelectedCounselor(counselor);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleTypeSelect = (type: 'online' | 'inPerson') => {
    setAppointmentType(type);
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppointmentReason(e.target.value);
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send the appointment data to your backend
    console.log({
      counselor: selectedCounselor,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      reason: appointmentReason
    });
    
    // For now, just move to confirmation step
    nextStep();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="background-pattern"></div>
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">Prendre un rendez-vous</h1>
        <AppointmentScheduler />
      </main>
      <Footer />
    </div>
  );
}
