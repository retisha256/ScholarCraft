export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-6">Settings</h1>
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
        <div className="space-y-6 max-w-lg">
          <div>
            <h2 className="text-base font-semibold font-poppins text-slate-900 dark:text-white mb-4">Site Configuration</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Configure your site settings in the <code className="text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-1 rounded">.env.local</code> file.
            </p>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
              <p>NEXT_PUBLIC_SUPABASE_URL=your_url</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key</p>
              <p>SUPABASE_SERVICE_ROLE_KEY=your_key</p>
              <p>ADMIN_EMAIL=admin@yourdomain.com</p>
              <p>NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890</p>
              <p>NEXT_PUBLIC_SITE_URL=https://yourdomain.com</p>
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold font-poppins text-slate-900 dark:text-white mb-3">Database Setup</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Run the SQL migration in <code className="text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-1 rounded">supabase/migrations/001_initial.sql</code> in your Supabase SQL editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
