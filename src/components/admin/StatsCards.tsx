interface StatsCardsProps {
  eventCount: number;
  totalParticipants: number;
  creatorCount: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ 
  eventCount, 
  totalParticipants, 
  creatorCount 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-100">
        <div className="text-3xl font-bold text-blue-600">{eventCount}</div>
        <div className="text-blue-700 text-sm mt-1">総イベント数</div>
      </div>
      <div className="bg-green-50 p-6 rounded-lg text-center border border-green-100">
        <div className="text-3xl font-bold text-green-600">{totalParticipants}</div>
        <div className="text-green-700 text-sm mt-1">総参加者数</div>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg text-center border border-purple-100">
        <div className="text-3xl font-bold text-purple-600">{creatorCount}</div>
        <div className="text-purple-700 text-sm mt-1">登録クリエイター数</div>
      </div>
    </div>
  );
};