import React, { useState, useMemo } from 'react';
import { Room, Booking } from '../types';
import { XMarkIcon, ClockIcon } from './Icons';
import { useI18n } from '../contexts/I18nContext';

interface BookingModalProps {
  room: Room;
  onClose: () => void;
  onAddBooking: (booking: Omit<Booking, 'id' | 'userId'>) => boolean;
  existingBookings: Booking[];
}

const timeSlots = Array.from({ length: 28 }, (_, i) => { // 7:00 to 20:30
  const hour = Math.floor(i / 2) + 7;
  const minute = (i % 2) * 30;
  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');
  return `${formattedHour}:${formattedMinute}`;
});

export const BookingModal: React.FC<BookingModalProps> = ({ room, onClose, onAddBooking, existingBookings }) => {
  const { t, locale } = useI18n();
  const today = new Date().toISOString().split('T')[0];
  const [meetingTitle, setMeetingTitle] = useState('');
  const [bookedBy, setBookedBy] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle || !bookedBy || !department) return;

    const startDateTime = new Date(`${date}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${date}T${endTime}:00`).toISOString();
    
    onAddBooking({
      roomId: room.id,
      roomName: t(room.nameKey as any),
      meetingTitle,
      bookedBy,
      department,
      startTime: startDateTime,
      endTime: endDateTime,
    });
  };

  const bookingsForSelectedDate = useMemo(() => {
    return existingBookings.filter(b => b.startTime.startsWith(date));
  }, [existingBookings, date]);

  const renderSchedule = () => {
    const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM to 8 PM (20:00)
    return (
      <div className="relative bg-gray-100 p-2 rounded-lg h-full overflow-y-auto">
        {hours.map(hour => (
          <div key={hour} className="relative h-16 border-t border-gray-300">
            <span className="absolute -top-3 left-0 text-xs text-gray-500 bg-gray-100 px-1">{`${hour.toString().padStart(2, '0')}:00`}</span>
          </div>
        ))}
        {bookingsForSelectedDate.map(booking => {
          const start = new Date(booking.startTime);
          const end = new Date(booking.endTime);
          const totalMinutesInDay = 14 * 60;
          const startMinute = (start.getHours() - 7) * 60 + start.getMinutes();
          const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

          const top = (startMinute / totalMinutesInDay) * 100;
          const height = (durationMinutes / totalMinutesInDay) * 100;
          
          return (
            <div
              key={booking.id}
              className="absolute bg-m365-primary bg-opacity-70 rounded-md text-white text-xs p-1 overflow-hidden"
              style={{ top: `${top}%`, height: `${height}%`, left: '40px', right: '10px' }}
              title={`${booking.meetingTitle} (${booking.bookedBy} - ${booking.department}) - ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
            >
              {booking.meetingTitle}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl transform transition-all max-h-[90vh] flex flex-col">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-m365-dark">{t('bookingModalTitle', { roomName: t(room.nameKey as any) })}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-m365-dark">{t('bookingModalMeetingDetails')}</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('bookingModalMeetingTitleLabel')}</label>
                  <input
                    type="text"
                    id="title"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-m365-primary focus:border-m365-primary"
                    required
                  />
                </div>
                 <div>
                  <label htmlFor="bookedBy" className="block text-sm font-medium text-gray-700">{t('bookingModalBookedByLabel')}</label>
                  <input
                    type="text"
                    id="bookedBy"
                    value={bookedBy}
                    onChange={(e) => setBookedBy(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-m365-primary focus:border-m365-primary"
                    required
                  />
                </div>
                 <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">{t('bookingModalDepartmentLabel')}</label>
                  <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-m365-primary focus:border-m365-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t('bookingModalDateLabel')}</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-m365-primary focus:border-m365-primary"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">{t('bookingModalStartLabel')}</label>
                    <select id="start-time" value={startTime} onChange={e => setStartTime(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-m365-primary focus:border-m365-primary">
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">{t('bookingModalEndLabel')}</label>
                     <select id="end-time" value={endTime} onChange={e => setEndTime(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-m365-primary focus:border-m365-primary">
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-4 text-m365-dark flex items-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                {t('bookingModalScheduleTitle', { date: new Date(date + 'T00:00:00').toLocaleDateString(locale) })}
              </h3>
              <div className="flex-grow min-h-[200px]">
                 {renderSchedule()}
              </div>
            </div>
          </div>
          <div className="bg-m365-light p-5 flex justify-end space-x-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {t('bookingModalCancelButton')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-m365-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-m365-secondary focus:outline-none"
            >
              {t('bookingModalConfirmButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};