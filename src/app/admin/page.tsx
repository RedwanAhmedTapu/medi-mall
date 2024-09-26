"use client";
import { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import VariantForm from "./components/VariantForm";
import { useSearchParams } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";

 function AdminPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Extract 'query' from the URL parameters

  const [currentForm, setCurrentForm] = useState<JSX.Element | null>(null); // Track the current form
  const [isTransitioning, setIsTransitioning] = useState(false); // Track transition state
  const [isFormVisible, setIsFormVisible] = useState(false); // Track whether form is visible

  // Function to render the form based on the query parameter
  const renderForm = () => {
    switch (query) {
      case "product-add":
        return <ProductForm />;
      case "category-add":
        return <CategoryForm />;
      case "variant-add":
        return <VariantForm />;
      default:
        return <p>Invalid path. Please select a valid form.</p>;
    }
  };

  // Handle form transitions on route changes
  useEffect(() => {
    // Trigger fade-out (slide-out to the right) transition
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      // After fade-out, update the form and trigger slide-in from the left
      setCurrentForm(renderForm());
      setIsFormVisible(true);

      setTimeout(() => {
        // After form is set, stop the transition effect
        setIsTransitioning(false);
      }, 300); // Duration for the fade-in
    }, 300); // Duration for the fade-out

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        {query === "product-add" && "Add New Product"}
        {query === "category-add" && "Add New Category"}
        {query === "variant-add" && "Add New Variant"}
      </h1>

      <div className="relative w-full h-full">
        {/* Placeholder for the form with transition */}
        <div
          className={`absolute inset-0 transform transition-transform duration-700 ${
            isTransitioning ? "translate-x-full " : "translate-x-0 "
          }`}
        >
          {currentForm}
        </div>
      </div>
    </div>
  );
}
export default PrivateRoute(AdminPage);