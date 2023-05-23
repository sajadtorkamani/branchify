'use client'

import React, { useState } from 'react'
import copy from 'copy-text-to-clipboard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TICKET_TYPES = [
  {
    label: 'Feature',
    value: 'feature',
  },
  {
    label: 'Task',
    value: 'task',
  },
  {
    label: 'Bugfix',
    value: 'bugfix',
  },
]

export default function Home() {
  const [ticketName, setTicketName] = useState('ACME-101 Add login form')
  const [ticketType, setTicketType] = useState('feature')

  function getBranchName() {
    let branchName = ticketName
      .toLowerCase()
      .replace(/\s/g, '-')
      .replace(/[^\w-]/g, '')

    return `${ticketType}/${branchName}`
  }

  const branchName = getBranchName()

  return (
    <main className="max-w-xl mx-auto mt-12 mb-6 text-center">
      <h1 className="text-2xl text-white mb-8">Generate branch name</h1>

      <input
        autoFocus
        type="text"
        value={ticketName}
        placeholder="Ticket name"
        className="px-6 py-2 text-xl block w-full text-center mb-3"
        onChange={(event) => setTicketName(event.target.value)}
      />

      <select
        value={ticketType}
        name="ticketType"
        className="py-1 p-2"
        id="ticketType"
        onChange={(event) => setTicketType(event.target.value)}
      >
        {TICKET_TYPES.map(({ label, value }) => (
          <option key={value} value={value} selected={value === ticketType}>
            {label}
          </option>
        ))}
      </select>

      {ticketName && (
        <div className="mt-4 flex justify-center gap-4">
          <div className="text-xxl text-white">{branchName}</div>
          <button
            className="bg-green-400 px-2 text-sm hover:opacity-75"
            onClick={() => {
              copy(branchName)
              toast.success('Copied to clipboard!')
            }}
          >
            Copy
          </button>

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      )}
    </main>
  )
}
