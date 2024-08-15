'use client';
import React, { useState } from 'react';
import { useAddShippingAddressMutation } from '../../features/apiSlice';
import { toast } from 'react-toastify';

const divisions = [
    {
      name: 'Dhaka',
      districts: [
        'Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur'
      ]
    },
    {
      name: 'Chattogram',
      districts: [
        'Chattogram', 'Cox\'s Bazar', 'Bandarban', 'Khagrachari', 'Rangamati', 'Noakhali', 'Feni', 'Laxmipur', 'Brahmanbaria', 'Cumilla', 'Chandpur'
      ]
    },
    {
      name: 'Rajshahi',
      districts: [
        'Rajshahi', 'Natore', 'Nawabganj', 'Pabna', 'Sirajganj', 'Bogra', 'Joypurhat', 'Naogaon'
      ]
    },
    {
      name: 'Khulna',
      districts: [
        'Khulna', 'Bagerhat', 'Satkhira', 'Jashore', 'Narail', 'Magura', 'Kushtia', 'Chuadanga', 'Meherpur', 'Jhenaidah'
      ]
    },
    {
      name: 'Barishal',
      districts: [
        'Barishal', 'Bhola', 'Patuakhali', 'Pirojpur', 'Barguna', 'Jhalokathi'
      ]
    },
    {
      name: 'Sylhet',
      districts: [
        'Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'
      ]
    },
    {
      name: 'Rangpur',
      districts: [
        'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon'
      ]
    },
    {
      name: 'Mymensingh',
      districts: [
        'Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'
      ]
    }
  ];
  

const ShippingPage: React.FC = () => {
  const [addShippingAddress] = useAddShippingAddressMutation();
  
  const [formState, setFormState] = useState({
    division: '',
    district: '',
    subDistrict: '',
    address: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({
      ...formState,
      division: e.target.value,
      district: '', // Reset district when division changes
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addShippingAddress(formState).unwrap();
      toast.success('Shipping address added successfully!');
      setFormState({
        division: '',
        district: '',
        subDistrict: '',
        address: '',
        name: '',
        phone: '',
      });
    } catch (error) {
      toast.error('Failed to add shipping address.');
    }
  };

  const filteredDistricts = divisions.find((d) => d.name === formState.division)?.districts || [];

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Shipping Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="division"
          value={formState.division}
          onChange={handleDivisionChange}
          className="block w-full p-2 border rounded-md"
          required
        >
          <option value="" disabled>Select Division</option>
          {divisions.map((division) => (
            <option key={division.name} value={division.name}>{division.name}</option>
          ))}
        </select>
        <select
          name="district"
          value={formState.district}
          onChange={handleChange}
          className="block w-full p-2 border rounded-md"
          required
          disabled={!formState.division}
        >
          <option value="" disabled>Select District</option>
          {filteredDistricts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
        <input
          type="text"
          name="subDistrict"
          value={formState.subDistrict}
          onChange={handleChange}
          placeholder="Sub-District"
          className="block w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="address"
          value={formState.address}
          onChange={handleChange}
          placeholder="Address"
          className="block w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full p-2 border rounded-md"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="block w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
