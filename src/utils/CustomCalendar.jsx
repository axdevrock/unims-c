import React, { useState } from 'react';

const getDaysInMonth = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
};

const CustomCalendar = ({ startDate, attendanceDetails }) => {
  const parsedStartDate = new Date(startDate);
  const [currentDate, setCurrentDate] = useState(new Date()); // Use new Date() instead of parse(Date.now())
  const today = new Date();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    if (prevMonthDate >= parsedStartDate) {
      setCurrentDate(prevMonthDate);
    }
  };

  const getDateStatus = (date) => {
    const formattedDate = formatDate(date);
    if (formattedDate === formatDate(parsedStartDate)) return 'start';
    if (Array.isArray(attendanceDetails) && attendanceDetails.includes(formattedDate)) return 'present';
    if (date < today) return 'absent';
    return 'future';
  };

  const getDateColor = (status) => {
    switch (status) {
      case 'start': return 'bg-green-300';
      case 'present': return 'bg-blue-300';
      case 'absent': return 'bg-red-300';
      default: return 'bg-gray-200';
    }
  };

  const renderEmptyCells = () => {
    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="p-2" />);
    }
    return cells;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex items-center mb-4">
        <button
          onClick={prevMonth}
          className={`p-2 bg-blue-500 text-white rounded-l ${currentDate <= parsedStartDate ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentDate <= parsedStartDate}
        >
          Prev
        </button>
        <div className="mx-2 text-lg">
          {currentDate ? currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) : ''}
        </div>
        <button onClick={nextMonth} className="p-2 bg-blue-500 text-white rounded-r">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-center p-2">{day}</div>
        ))}
        {renderEmptyCells()}
        {daysInMonth.map((date) => {
          const status = getDateStatus(date);
          const isToday = formatDate(date) === formatDate(today);
          return (
            <div
              key={date.toString()}
              className={`p-2 text-center ${getDateColor(status)} ${isToday ? 'border-2 border-blue-500' : ''}`}
            >
              {date.getDate().toString()}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-300 mr-2" />
          <span>Start Date</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-300 mr-2" />
          <span>Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-300 mr-2" />
          <span>Absent</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 mr-2" />
          <span>Future</span>
        </div>
      </div> 
    </div>
  );
};

export default CustomCalendar;
