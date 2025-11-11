import React, { useMemo } from 'react';
import { Room, Booking } from '../types';
import { XMarkIcon, UsersIcon, ClockIcon, UserCircleIcon, BuildingOffice2Icon, MapPinIcon, WifiIcon, PresentationChartBarIcon, ClipboardDocumentListIcon, TvIcon, SpeakerWaveIcon } from './Icons';
import { useI18n } from '../contexts/I18nContext';

interface RoomDetailModalProps {
  room: Room;
  onClose: () => void;
  bookings: Booking[];
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose, bookings }) => {
  const { t, locale } = useI18n();
  const today = new Date().toISOString().split('T')[0];

  const todaysBookings = useMemo(() => {
    return bookings
      .filter(b => b.startTime.startsWith(today))
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [bookings, today]);

  const getAmenityIcon = (amenityKey: string) => {
    const iconClass = "w-5 h-5 text-m365-secondary";
    switch(amenityKey) {
        case 'amenityProjector': return <PresentationChartBarIcon className={iconClass} />;
        case 'amenityOnlineMeeting': return <WifiIcon className={iconClass} />;
        case 'amenityWhiteboard': return <ClipboardDocumentListIcon className={iconClass} />;
        case 'amenityLedScreen': return <TvIcon className={iconClass} />;
        case 'amenitySoundSystem': return <SpeakerWaveIcon className={iconClass} />;
        default: return null;
    }
  }
  
  const todayFormatted = new Date().toLocaleDateString(locale);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl transform transition-all max-h-[90vh] flex flex-col">
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-m365-dark">{t(room.nameKey as any)}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Image and Details */}
          <div>
            <img src={room.imageUrl} alt={t(room.nameKey as any)} className="w-full h-64 object-cover rounded-lg mb-4" />
            <div className="space-y-3">
               <div className="flex items-center text-gray-700">
                <MapPinIcon className="w-6 h-6 mr-3 text-m365-primary" />
                <span className="font-medium">{t(room.locationKey as any)}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <UsersIcon className="w-6 h-6 mr-3 text-m365-primary" />
                <span className="font-medium">{t('roomDetailCapacity')}</span>
                <span className="ml-2">{t('roomDetailCapacityValue', { capacity: room.capacity })}</span>
              </div>
              <div>
                <h4 className="font-semibold text-m365-dark mb-2">{t('roomDetailAmenities')}</h4>
                <ul className="space-y-2 pl-2">
                  {room.amenityKeys.map((amenityKey) => (
                    <li key={amenityKey} className="flex items-center text-gray-600">
                       {getAmenityIcon(amenityKey)}
                       <span className="ml-3">{t(amenityKey as any)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Today's Schedule */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-m365-dark flex items-center">
              <ClockIcon className="w-5 h-5 mr-2" />
              {t('roomDetailScheduleTitle', { date: todayFormatted })}
            </h3>
            <div className="space-y-3 pr-2 max-h-[50vh] overflow-y-auto">
              {todaysBookings.length > 0 ? (
                todaysBookings.map(booking => (
                  <div key={booking.id} className="bg-m365-light p-3 rounded-lg border border-gray-200">
                    <p className="font-bold text-m365-primary">{booking.meetingTitle}</p>
                    <p className="text-sm text-gray-600 font-semibold my-1">
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <div className="text-sm text-gray-500 mt-2 border-t pt-2">
                       <div className="flex items-center">
                         <UserCircleIcon className="w-4 h-4 mr-2"/> 
                         <span>{booking.bookedBy}</span>
                       </div>
                       <div className="flex items-center mt-1">
                         <BuildingOffice2Icon className="w-4 h-4 mr-2"/>
                         <span>{booking.department}</span>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">{t('roomDetailNoBookings')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-m365-light p-5 flex justify-end space-x-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-m365-primary border border-transparent rounded-md text-sm font-medium text-white hover:bg-m365-secondary focus:outline-none"
          >
            {t('roomDetailCloseButton')}
          </button>
        </div>
      </div>
    </div>
  );
};