import { CarConsoleShell } from '@/components/car-console-shell';

export const metadata = {
  title: 'Malaika Car Repairing Services — Workshop Console',
};

export default function CarConsoleLayout({ children }: { children: React.ReactNode }) {
  return <CarConsoleShell>{children}</CarConsoleShell>;
}
