import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BasicQuery } from './components/BasicQuery'

export const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <BasicQuery />
      </div>
    </QueryClientProvider>
  );
}

export default App;
