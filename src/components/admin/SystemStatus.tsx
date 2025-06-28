export const SystemStatus = () => {
  return (
    <div className="bg-green-50 rounded-lg p-6 border border-green-100">
      <h3 className="text-lg font-semibold mb-4">⚙️ システム状況</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-green-800 mb-3">動作状況</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-sm text-gray-700">ウェブサイト</span>
              <span className="text-xs text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                正常
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-sm text-gray-700">管理機能</span>
              <span className="text-xs text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                動作中
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded border">
              <span className="text-sm text-gray-700">データ管理</span>
              <span className="text-xs text-blue-600 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                ローカル状態
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-green-800 mb-3">環境情報</h4>
          <div className="space-y-1 text-sm text-gray-700 bg-white p-3 rounded border">
            <div className="flex justify-between">
              <span>プラットフォーム:</span>
              <span className="font-medium">Vercel</span>
            </div>
            <div className="flex justify-between">
              <span>フレームワーク:</span>
              <span className="font-medium">Next.js 15.3</span>
            </div>
            <div className="flex justify-between">
              <span>管理場所:</span>
              <span className="font-medium">/contact</span>
            </div>
            <div className="flex justify-between">
              <span>更新方式:</span>
              <span className="font-medium">リアルタイム</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <div className="flex items-start space-x-2">
          <div className="text-yellow-600 mt-0.5">💡</div>
          <div>
            <h5 className="text-sm font-medium text-yellow-800">次のステップ</h5>
            <p className="text-xs text-yellow-700 mt-1">
              データを永続化するには、ローカルストレージまたはデータベース連携が必要です。
              現在は画面更新で初期状態に戻ります。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};