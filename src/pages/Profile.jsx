import './Profile.css';
export default function Profile({ user }) {
  if (!user) return null;
  return (
    <div className="profile-card">
      <div className="profile-avatar">{user.name ? user.name[0].toUpperCase() : '?'}</div>
      <div className="profile-info">
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">{user.email}</div>
      </div>
    </div>
  );
} 