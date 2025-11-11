import React, { useState, useMemo } from 'react';
import { Room, Booking } from './types';
import { MOCK_ROOMS, MOCK_BOOKINGS } from './constants';
import { Header } from './components/Header';
import { RoomCard } from './components/RoomCard';
import { BookingModal } from './components/BookingModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { useI18n } from './contexts/I18nContext';

const App: React.FC = () => {
  const [rooms] = useState<Room[]>(MOCK_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [selectedRoomForDetail, setSelectedRoomForDetail] = useState<Room | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { t } = useI18n();

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleOpenBookingModal = (room: Room) => {
    setSelectedRoomForBooking(room);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setSelectedRoomForBooking(null);
    setIsBookingModalOpen(false);
  };

  const handleOpenDetailModal = (room: Room) => {
    setSelectedRoomForDetail(room);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedRoomForDetail(null);
    setIsDetailModalOpen(false);
  };
  
  const handleAddBooking = (newBooking: Omit<Booking, 'id' | 'userId'>): boolean => {
    const newBookingStart = new Date(newBooking.startTime).getTime();
    const newBookingEnd = new Date(newBooking.endTime).getTime();

    if (newBookingStart >= newBookingEnd) {
      showNotification(t('notificationErrorTime'), 'error');
      return false;
    }

    const isConflict = bookings.some(booking => {
      if (booking.roomId !== newBooking.roomId) return false;
      const existingStart = new Date(booking.startTime).getTime();
      const existingEnd = new Date(booking.endTime).getTime();
      return (newBookingStart < existingEnd && newBookingEnd > existingStart);
    });

    if (isConflict) {
      showNotification(t('notificationErrorConflict'), 'error');
      return false;
    }

    const newBookingWithId: Booking = {
      ...newBooking,
      id: `booking-${Date.now()}`,
      userId: 'user-123', // Mock user ID
    };
    
    setBookings(prevBookings => [...prevBookings, newBookingWithId].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
    showNotification(t('notificationSuccess', { roomName: newBooking.roomName }), 'success');
    handleCloseBookingModal();
    return true;
  };

  const bookingsByRoom = useMemo(() => {
    return bookings.reduce((acc, booking) => {
      if (!acc[booking.roomId]) {
        acc[booking.roomId] = [];
      }
      acc[booking.roomId].push(booking);
      return acc;
    }, {} as Record<string, Booking[]>);
  }, [bookings]);

  return (
    <div className="bg-m365-light min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-semibold text-m365-dark mb-6">{t('selectRoomTitle')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={() => handleOpenBookingModal(room)}
              onViewDetails={() => handleOpenDetailModal(room)}
              bookings={bookingsByRoom[room.id] || []}
            />
          ))}
        </div>
      </main>

      {isBookingModalOpen && selectedRoomForBooking && (
        <BookingModal
          room={selectedRoomForBooking}
          onClose={handleCloseBookingModal}
          onAddBooking={handleAddBooking}
          existingBookings={bookingsByRoom[selectedRoomForBooking.id] || []}
        />
      )}

      {isDetailModalOpen && selectedRoomForDetail && (
         <RoomDetailModal
          room={selectedRoomForDetail}
          onClose={handleCloseDetailModal}
          bookings={bookingsByRoom[selectedRoomForDetail.id] || []}
        />
      )}

      {notification && (
        <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white ${notification.type === 'success' ? 'bg-success' : 'bg-danger'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default App;
