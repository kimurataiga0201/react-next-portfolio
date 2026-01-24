import Sheet from '@/app/_components/Sheet';

export const metadata = {
  title: 'ブログ',
};

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function BlogLayout({ children }: Props) {
  return (
    <div style={{ paddingTop: '120px' }}>
      <Sheet>{children}</Sheet>
    </div>
  );
}
