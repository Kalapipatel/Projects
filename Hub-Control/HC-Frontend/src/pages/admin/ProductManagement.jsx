import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductModal from '../../components/admin/ProductModal';
import { Search, Package, Image as ImageIcon } from 'lucide-react';

const ProductManagement = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search Logic (Debounced slightly or trigger on Enter)
  // For simplicity, we trigger fetch when search query changes or clears
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchSearchResults(searchQuery);
      } else {
        fetchProducts(); // Reload all if search cleared
      }
    }, 500); // 500ms delay to wait for user to stop typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/admin/getAllProducts');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const fetchSearchResults = async (keyword) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/admin/searchProducts?keyword=${keyword}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
        const response = await fetch(`http://localhost:8080/api/admin/deleteProduct/${id}`, { 
            method: 'DELETE' 
        });

        if (response.ok) {
            // Success: Remove from UI
            setProducts(prev => prev.filter(p => p.productId !== id));
        } else {
            // Error: Read the text message sent from Backend (AdminController)
            const errorMsg = await response.text();
            alert(`Failed to delete: ${errorMsg}`);
        }
    } catch (error) { 
        console.error(error);
        alert("Server connection failed.");
    }
  };

  const handleModalSuccess = (result, isEditMode) => {
    if (isEditMode) {
        setProducts(prev => prev.map(p => p.productId === result.productId ? result : p));
    } else {
        setProducts(prev => [...prev, result]);
    }
  };

  return (
    <AdminLayout currentView="adminProducts" onNavigate={onNavigate}>
      
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleModalSuccess}
        productToEdit={productToEdit}
      />

      <div className="rounded-2xl border bg-white border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
        
        {/* HEADER & SEARCH */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Package size={20} className="text-blue-500"/> Product Master
            </h2>
            <p className="text-sm text-slate-500">Manage global product catalog</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative group w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search name or SKU..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>

            <button
              onClick={() => { setProductToEdit(null); setIsModalOpen(true); }}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all whitespace-nowrap"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs font-bold uppercase bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">SKU</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr><td colSpan="5" className="text-center py-6">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-6 text-slate-500">No products found.</td></tr>
              ) : products.map((product) => (
                <tr key={product.productId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                        ) : (
                          <ImageIcon size={16} className="text-slate-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{product.productName}</div>
                        <div className="text-xs text-slate-500 max-w-[200px] truncate">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-500">{product.sku}</td>
                  <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {product.supplier ? product.supplier.supplierName : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => { setProductToEdit(product); setIsModalOpen(true); }} className="text-blue-600 hover:underline font-medium">Edit</button>
                      <button onClick={() => handleDelete(product.productId)} className="text-red-600 hover:underline font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;