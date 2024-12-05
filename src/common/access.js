const adminId = process.env.REACT_APP_ADMIN_ID;
const moderatorId = process.env.REACT_APP_MODERATOR_ID;

if (!adminId || !moderatorId) {
  console.error('Admin ID или Moderator ID не определены в переменных окружения.');
}

export const chatIds = [Number(adminId), Number(moderatorId)]
