import styles from './page.module.css';
import { Profile } from '@/widgets/profile';
import { BottomNavigation } from '@/widgets/bottom-navigation';

export default function ProfilePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>

      <Profile />

      <BottomNavigation />
    </main>
  );
}
