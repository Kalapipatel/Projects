import React, { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, onClose, onSuccess, productToEdit = null }) => {
  const [formData, setFormData] = useState({
    sku: '', productName: '', description: '',
    price: '', imageUrl: '', supplierId: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        sku: productToEdit.sku,
        productName: productToEdit.productName,
        description: productToEdit.description || '',
        price: productToEdit.price,
        imageUrl: productToEdit.imageUrl || '',
        supplierId: productToEdit.supplier?.supplierId || '' 
      });
    } else {
      setFormData({ sku: '', productName: '', description: '', price: '', imageUrl: '', supplierId: '' });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEditMode = !!productToEdit;
    const url = isEditMode 
      ? `http://localhost:8080/api/admin/updateProduct/${productToEdit.productId}`
      : 'http://localhost:8080/api/admin/addProduct';
    const method = isEditMode ? 'PUT' : 'POST';

    // Ensure price/supplierId are numbers
    const payload = {
        ...formData,
        price: parseFloat(formData.price),
        supplierId: formData.supplierId ? parseInt(formData.supplierId) : null
    };

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            onSuccess(data, isEditMode);
            onClose();
        } else {
            alert("Operation failed");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {productToEdit ? 'Edit Product' : 'Add New Product'}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          
          <div className="col-span-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SKU</label>
            <input type="text" name="sku" required value={formData.sku} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Name</label>
            <input type="text" name="productName" required value={formData.productName} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea name="description" rows="2" value={formData.description} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price ($)</label>
            <input type="number" step="0.01" name="price" required value={formData.price} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          <div className="col-span-1">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Supplier ID</label>
             <input type="number" name="supplierId" placeholder="e.g., 1" value={formData.supplierId} onChange={handleChange}
               className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
            <input type="text" name="imageUrl" placeholder="http://..." value={formData.imageUrl} onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:border-blue-500" />
          </div>

          <div className="col-span-2 flex gap-3 mt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50">
              {loading ? 'Saving...' : (productToEdit ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;