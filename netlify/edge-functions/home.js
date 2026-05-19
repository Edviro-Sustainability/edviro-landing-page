export default async (request, context) => {
  const ua = request.headers.get('user-agent') ?? '';
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  return context.rewrite(isMobile ? '/mobile/index.html' : '/index.html');
};

export const config = { path: '/home' };
