// 入力値検証ユーティリティ

export const ValidationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: '有効なメールアドレスを入力してください'
  },
  password: {
    minLength: 6,
    maxLength: 128,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]/,
    message: 'パスワードは6文字以上で、英字と数字を含む必要があります'
  },
  name: {
    minLength: 1,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s]+$/,
    message: '名前には英数字、ひらがな、カタカナ、漢字のみ使用できます'
  }
};

export function validateEmail(email: string): boolean {
  return ValidationRules.email.pattern.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= ValidationRules.password.minLength &&
         password.length <= ValidationRules.password.maxLength;
}

export function validateName(name: string): boolean {
  return name.length >= ValidationRules.name.minLength &&
         name.length <= ValidationRules.name.maxLength &&
         ValidationRules.name.pattern.test(name);
}

// XSS対策: HTMLエスケープ
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// SQLインジェクション対策は Prisma が自動的に処理するため不要