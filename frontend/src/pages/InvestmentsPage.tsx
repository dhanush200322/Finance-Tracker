import { useState } from 'react';
import { InvestmentTable } from '../components/investment/InvestmentTable';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Search, Filter, Briefcase } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { InvestmentForm } from '../components/investment/InvestmentForm';
import { DeleteDialog } from '../components/investment/DeleteDialog';
import { PageHeader } from '../components/layout/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { useInvestments, useInvestmentMutations } from '../hooks/useInvestments';
import { Investment } from '../types';

export const InvestmentsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | undefined>(undefined);
  const [deletingInvestment, setDeletingInvestment] = useState<Investment | undefined>(undefined);
  const [search, setSearch] = useState('');

  const { data: investments = [], isLoading } = useInvestments();
  const { deleteInvestment, isDeleting } = useInvestmentMutations();

  const filtered = investments.filter(inv => inv.investmentName.toLowerCase().includes(search.toLowerCase()));

  const handleEdit = (inv: Investment) => {
    setEditingInvestment(inv);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingInvestment(undefined);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingInvestment) {
      await deleteInvestment(deletingInvestment.id);
      setDeletingInvestment(undefined);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Your Investments" 
        description="Manage and track your individual assets." 
        action={<Button onClick={handleAdd}><Plus className="w-4 h-4 mr-2" />Add Investment</Button>} 
      />

      <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex-1">
          <Input 
            icon={Search} 
            placeholder="Search investments by name..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="bg-white"
          />
        </div>
        <Button variant="secondary" className="px-5 shrink-0"><Filter className="w-4 h-4 mr-2 text-gray-500" />Filters</Button>
      </div>

      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 text-gray-500 gap-3">
          <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading investments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState 
          icon={Briefcase}
          title={search ? "No matches found" : "No investments yet"}
          description={search ? "Try adjusting your search query." : "Add your first investment to start tracking your portfolio performance."}
          action={!search && <Button onClick={handleAdd}><Plus className="w-4 h-4 mr-2" />Add Investment</Button>}
        />
      ) : (
        <InvestmentTable investments={filtered} onEdit={handleEdit} onDelete={setDeletingInvestment} />
      )}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingInvestment ? "Edit Investment" : "New Investment"}>
        <InvestmentForm onClose={() => setIsFormOpen(false)} defaultValues={editingInvestment} />
      </Modal>
      
      <Modal isOpen={!!deletingInvestment} onClose={() => setDeletingInvestment(undefined)} title="Delete Investment">
        <DeleteDialog onClose={() => setDeletingInvestment(undefined)} onConfirm={handleDeleteConfirm} isLoading={isDeleting} />
      </Modal>
    </div>
  );
};
