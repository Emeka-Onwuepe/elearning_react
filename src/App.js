
import { RouterProvider } from 'react-router-dom';
import './css/form.css'
import { AppRoutes } from './routes';

function App() {
  return (
    <RouterProvider router={AppRoutes}/>
    
  );
}

export default App;
