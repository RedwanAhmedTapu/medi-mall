import ProductForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';
import VariantForm from './components/VariantForm';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>
      <CategoryForm/>
      <VariantForm/>
      <ProductForm />
    </div>
  );
}
