export const vi = {
  headerTitle: 'Hệ thống Đặt phòng họp',
  contactInfo: 'Liên hệ Lễ tân (Ban NLNS): 02113.888.987',
  headerWelcome: 'Xin chào, Nhân viên',
  selectRoomTitle: 'Chọn phòng họp',
  // RoomCard
  roomCardCapacity: 'Tối đa {capacity} người',
  roomStatusReady: 'Sẵn sàng',
  roomStatusBusy: 'Đang có họp',
  roomStatusUpcoming: 'Có lịch sau {minutes} phút',
  detailsButton: 'Chi tiết',
  bookButton: 'Đặt phòng',
  // BookingModal
  bookingModalTitle: 'Đặt phòng: {roomName}',
  bookingModalMeetingDetails: 'Chi tiết cuộc họp',
  bookingModalMeetingTitleLabel: 'Tên cuộc họp',
  bookingModalBookedByLabel: 'Người đặt phòng',
  bookingModalDepartmentLabel: 'Bộ phận',
  bookingModalDateLabel: 'Ngày',
  bookingModalStartLabel: 'Bắt đầu',
  bookingModalEndLabel: 'Kết thúc',
  bookingModalScheduleTitle: 'Lịch phòng ngày {date}',
  bookingModalCancelButton: 'Hủy',
  bookingModalConfirmButton: 'Xác nhận Đặt phòng',
  // RoomDetailModal
  roomDetailModalTitle: '{roomName}',
  roomDetailCapacity: 'Sức chứa:',
  roomDetailCapacityValue: '{capacity} người',
  roomDetailAmenities: 'Tiện nghi có sẵn:',
  roomDetailScheduleTitle: 'Lịch trình hôm nay ({date})',
  roomDetailNoBookings: 'Không có lịch đặt phòng nào cho hôm nay.',
  roomDetailCloseButton: 'Đóng',
  // Notifications in App.tsx
  notificationSuccess: 'Đặt phòng "{roomName}" thành công!',
  notificationErrorTime: 'Thời gian kết thúc phải sau thời gian bắt đầu.',
  notificationErrorConflict: 'Phòng đã được đặt trong khung giờ này. Vui lòng chọn thời gian khác.',

  // Room Names
  room1Name: 'Phòng họp số 1',
  room2Name: 'Phòng họp số 2',
  room3Name: 'Phòng họp số 3',
  roomGreatName: 'Phòng GREAT',
  roomTrainingName: 'Phòng Đào tạo',
  roomHallName: 'Hội trường lớn',

  // Room Locations
  room1Location: 'Tầng 2 (đối diện phòng CNTT)',
  room2Location: 'Tầng 1 (gần bếp ăn)',
  room3Location: 'Tầng 1 (gần phòng Ban NLNS)',
  roomGreatLocation: 'Tầng 2 (gần cầu thang)',
  roomTrainingLocation: 'Tầng 1 (đối diện phòng ăn VIP)',
  roomHallLocation: 'Tầng 1 tòa Viện Gốm Sứ',
  
  // Amenities
  amenityProjector: 'Máy chiếu',
  amenityOnlineMeeting: 'Họp trực tuyến',
  amenityWhiteboard: 'Bảng trắng',
  amenityLedScreen: 'Màn LED',
  amenitySoundSystem: 'Âm thanh (loa, mic, âm li)',
};

export type Translations = typeof vi;