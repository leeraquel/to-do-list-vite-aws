// src/components/Navigation.tsx
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// shadcn/ui 컴포넌트 import
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { href: "/", label: "Home" },
    { href: "/todos", label: "Todo List" },
    { href: "/postit", label: "포스트잇" },
    { href: "/notepad", label: "메모장" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Mala App
        </Link>

        {/* 데스크톱 메뉴 */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={
                isActive(link.href)
                  ? "px-3 py-2 text-sm font-medium rounded-md bg-gray-900 text-white"
                  : "px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 모바일 메뉴 버튼 (Sheet 사용) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-gray-700 hover:bg-gray-100"
              >
                {/* 햄버거 아이콘 */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 p-0">
              <SheetHeader className="p-4">
                <SheetTitle className="text-lg font-semibold">메뉴</SheetTitle>
                <SheetDescription className="text-sm text-gray-500">
                  원하는 페이지로 이동하세요.
                </SheetDescription>
              </SheetHeader>

              <ScrollArea className="flex-1 px-4">
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={
                          isActive(link.href)
                            ? "block px-3 py-2 rounded-md text-base font-medium bg-gray-900 text-white"
                            : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ScrollArea>

              <SheetFooter className="p-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  닫기
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
