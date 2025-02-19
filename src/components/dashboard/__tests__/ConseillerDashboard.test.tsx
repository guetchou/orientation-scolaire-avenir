
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ConseillerDashboard } from '../ConseillerDashboard';
import { supabase } from '@/integrations/supabase/client';
import { vi } from 'vitest';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn()
      })),
      eq: vi.fn()
    }))
  }
}));

describe('ConseillerDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders dashboard components', async () => {
    render(<ConseillerDashboard />);
    expect(screen.getByText('Tableau de bord conseiller')).toBeInTheDocument();
  });

  test('fetches and displays stats', async () => {
    const mockStats = {
      total_students: 10,
      tests_completed: 25,
      appointments_scheduled: 5,
      average_progress: 75
    };

    vi.mocked(supabase.from).mockImplementationOnce(() => ({
      select: () => ({
        single: () => Promise.resolve({ data: mockStats, error: null })
      })
    }));

    render(<ConseillerDashboard />);
    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
    });
  });
});
