// シンプルなインメモリレート制限
// 本番環境では Redis などを使用することを推奨

const attempts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15分
): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now();
  const userAttempts = attempts.get(identifier);

  // 初回アクセスまたはリセット時間を過ぎている場合
  if (!userAttempts || now > userAttempts.resetTime) {
    attempts.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true, remainingAttempts: maxAttempts - 1 };
  }

  // 制限に達している場合
  if (userAttempts.count >= maxAttempts) {
    return { allowed: false, remainingAttempts: 0 };
  }

  // カウントを増やす
  userAttempts.count++;
  return { allowed: true, remainingAttempts: maxAttempts - userAttempts.count };
}

// 定期的なクリーンアップ（メモリリーク防止）
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of attempts.entries()) {
    if (now > value.resetTime) {
      attempts.delete(key);
    }
  }
}, 60 * 60 * 1000); // 1時間ごと