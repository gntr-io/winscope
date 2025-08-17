import { useState } from 'react'

export default function Winscope() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:5000/winscope', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setResponse(JSON.stringify(data))
    } catch (err: any) {
      setResponse('Error: ' + err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight select-none">
            Winscope
            <span className="block text-blue-400 text-3xl md:text-4xl font-light mt-1">
              AI Agent
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-4">
            Get intelligent football analysis powered by AI
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your football analysis query..."
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm caret-blue-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e)
                  }
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-blue-500/25"
            >
              Let's Roll
            </button>
          </div>
        </div>

        {/* Response */}
        {response && (
          <div className="text-center mt-6">
            <p className="text-white text-sm bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
              {response}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs">
            Powered by advanced AI analysis
          </p>
        </div>
      </div>
    </div>
  )
}
