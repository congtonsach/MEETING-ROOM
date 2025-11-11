import React from 'react';
import { Room, Booking } from '../types';
import { UsersIcon, WifiIcon, PresentationChartBarIcon, MapPinIcon, TvIcon, SpeakerWaveIcon, ClipboardDocumentListIcon } from './Icons';
import { useI18n } from '../contexts/I18nContext';

interface RoomCardProps {
  room: Room;
  onBook: () => void;
  onViewDetails: () => void;
  bookings: Booking[];
}

const getStatus = (bookings: Booking[], t: (key: string, options?: any) => string): { text: string; color: string } => {
  const now = new Date().getTime();
  const upcomingBooking = bookings.sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()).find(b => new Date(b.startTime).getTime() > now);
  const currentBooking = bookings.find(b => {
    const start = new Date(b.startTime).getTime();
    const end = new Date(b.endTime).getTime();
    return now >= start && now < end;
  });

  if (currentBooking) {
    return { text: t('roomStatusBusy'), color: 'text-danger' };
  }
  
  if (upcomingBooking) {
    const startTime = new Date(upcomingBooking.startTime);
    const timeDiff = startTime.getTime() - now;
    const minutesUntil = Math.round(timeDiff / (1000 * 60));
    
    if (minutesUntil <= 60) {
       return { text: t('roomStatusUpcoming', { minutes: minutesUntil }), color: 'text-yellow-600' };
    }
  }

  return { text: t('roomStatusReady'), color: 'text-success' };
};

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBook, onViewDetails, bookings }) => {
  const { t } = useI18n();
  const status = getStatus(bookings, t);

  const getAmenityIcon = (amenityKey: string) => {
    const iconClass = "w-4 h-4 text-m365-secondary";
    switch(amenityKey) {
        case 'amenityProjector': return <PresentationChartBarIcon className={iconClass} />;
        case 'amenityOnlineMeeting': return <WifiIcon className={iconClass} />;
        case 'amenityWhiteboard': return <ClipboardDocumentListIcon className={iconClass} />;
        case 'amenityLedScreen': return <TvIcon className={iconClass} />;
        case 'amenitySoundSystem': return <SpeakerWaveIcon className={iconClass} />;
        default: return null;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img src={room.imageUrl} alt={t(room.nameKey as any)} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-m365-dark">{t(room.nameKey as any)}</h3>
        <div className="flex items-center text-gray-500 my-2 text-sm">
          <MapPinIcon className="w-5 h-5 mr-2" />
          <span>{t(room.locationKey as any)}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-2 text-sm">
          <UsersIcon className="w-5 h-5 mr-2" />
          <span>{t('roomCardCapacity', { capacity: room.capacity })}</span>
        </div>
        <div className="flex-grow space-y-1 mb-4">
          {room.amenityKeys.map((amenityKey) => (
            <div key={amenityKey} className="flex items-center text-sm text-gray-700">
              {getAmenityIcon(amenityKey)}
              <span className="ml-2">{t(amenityKey as any)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 mt-auto">
            <div className="flex justify-between items-center">
                <span className={`font-semibold text-sm ${status.color}`}>{status.text}</span>
                <div className="flex items-center space-x-2">
                   <button
                    onClick={onViewDetails}
                    className="text-m365-primary font-semibold px-3 py-2 rounded-md hover:bg-m365-light transition-colors duration-300 text-sm"
                  >
                    {t('detailsButton')}
                  </button>
                  <button
                      onClick={onBook}
                      className="bg-m365-primary text-white font-semibold px-3 py-2 rounded-md hover:bg-m365-secondary transition-colors duration-300 text-sm"
                  >
                      {t('bookButton')}
                  </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};