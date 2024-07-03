import React from 'react'

export default function Footer() {
  return (
    <div className="py-3">
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="flex flex-col items-center">
          <aside className="mb-2">
            <p>© 2024 วชิรวิทย์ ดวงดี - All rights reserved</p>
          </aside>
          <div className="flex space-x-4">
            <a href="https://github.com/Mosquito5142" target="_blank" rel="noopener noreferrer" className="link link-hover">Github</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link link-hover">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link link-hover">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
