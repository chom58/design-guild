'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Event } from '@/lib/types';

interface EventCalendarProps {
  events: Event[];
  onEventClick: (eventId: string) => void;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: Event[];
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get previous month's last days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();
  
  // Generate calendar days
  const calendarDays: CalendarDay[] = [];
  
  // Previous month's days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      events: getEventsForDate(date, events)
    });
  }
  
  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays.push({
      date,
      isCurrentMonth: true,
      events: getEventsForDate(date, events)
    });
  }
  
  // Next month's days (to fill the grid)
  const remainingDays = 42 - calendarDays.length; // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      events: getEventsForDate(date, events)
    });
  }
  
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  const monthName = currentDate.toLocaleDateString('ja-JP', { 
    year: 'numeric', 
    month: 'long' 
  });
  
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
          >
            今日
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const isToday = isSameDay(day.date, today);
          
          return (
            <motion.div
              key={index}
              className={`
                relative h-24 p-1 border border-gray-100 rounded-lg cursor-pointer
                ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
                ${isToday ? 'ring-2 ring-blue-500' : ''}
                hover:bg-blue-50 transition-colors
              `}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.1 }}
            >
              <div className={`
                text-sm font-medium mb-1
                ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                ${isToday ? 'text-blue-600' : ''}
              `}>
                {day.date.getDate()}
              </div>
              
              {/* Event indicators */}
              <div className="space-y-1">
                {day.events.slice(0, 2).map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    className={`
                      text-xs px-1 py-0.5 rounded text-white cursor-pointer truncate
                      ${getCategoryColor(event.category)}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event.id);
                    }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: eventIndex * 0.1 }}
                  >
                    {event.title}
                  </motion.div>
                ))}
                {day.events.length > 2 && (
                  <div className="text-xs text-gray-500 px-1">
                    +{day.events.length - 2} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

function getEventsForDate(date: Date, events: Event[]): Event[] {
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return isSameDay(date, eventDate);
  });
}

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

function getCategoryColor(category: string): string {
  const colors = {
    networking: 'bg-blue-500',
    workshop: 'bg-purple-500',
    seminar: 'bg-green-500',
    exhibition: 'bg-amber-500',
    competition: 'bg-red-500'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-500';
}