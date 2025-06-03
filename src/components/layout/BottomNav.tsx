import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, BarChart, Activity, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      icon: Wallet,
      label: 'Wallet',
      path: '/',
      active: currentPath === '/',
    },
    {
      icon: BarChart,
      label: 'Discover',
      path: '/discover',
      active: currentPath === '/discover',
    },
    {
      icon: Activity,
      label: 'Activity',
      path: '/activity',
      active: currentPath === '/activity',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/settings',
      active: currentPath === '/settings',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:w-96 md:mx-auto">
      <nav className="bg-white/90 dark:bg-[#14141f]/80 backdrop-blur-md 
                      border-t border-zinc-200 dark:border-[#2d2d3d] 
                      p-1 rounded-t-2xl transition-colors">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.path} className="relative">
              <Link
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-2 px-2 rounded-xl relative",
                  item.active ? "text-violet-500 dark:text-violet-400" : "text-zinc-500 dark:text-gray-500"
                )}
              >
                {item.active && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-zinc-200 dark:bg-[#252536] rounded-xl z-0"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <item.icon
                  className={cn(
                    "relative z-10 w-5 h-5 mb-1",
                    item.active ? "text-violet-500 dark:text-violet-400" : "text-zinc-500 dark:text-gray-500"
                  )}
                />
                <span className="text-xs relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BottomNav;
