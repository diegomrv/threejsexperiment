import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene'), {
    ssr: false,
})

export default function Home() {
  return (
      <main className="flex min-h-screen items-center justify-between">
          <div className="flex flex-col flex-none h-screen w-64 border-r-1 border-gray-200 p-2">
              Sidebar
          </div>
          <div className="flex flex-col h-screen min-h-0 min-w-0 w-full bg-gray-500 align-middle justify-center">
                <Scene />
          </div>
      </main>
  );
}
