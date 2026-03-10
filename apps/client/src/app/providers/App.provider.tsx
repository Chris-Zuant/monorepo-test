import { Provider } from 'react-redux';
import { store } from './theme/store';
import { QueryProvider } from './query/Query.provider';
import { ThemeProvider } from './theme/Theme.provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </Provider>
  );
};
