'use client';

import { Icons } from '@/assets/icons';
import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCheckoutStore } from '@/stores/CheckoutStore';
import { useUserStore } from '@/stores/UserStore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// Mock user addresses - replace with actual API call
interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const ShippingForm = () => {
  const { user } = useUserStore();
  const { shippingAddress, setShippingAddress } = useCheckoutStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const form = useForm();
  const newAddressForm = useForm();

  // Fetch user addresses - replace with actual API call
  useEffect(() => {
    // Mock data - replace with API call
    const mockAddresses: Address[] = [
      {
        id: '1',
        fullName: user?.name || '',
        phoneNumber: user?.phone || '',
        email: user?.email || '',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        isDefault: true,
      },
      {
        id: '2',
        fullName: user?.name || '',
        phoneNumber: user?.phone || '',
        email: user?.email || '',
        address: '456 Park Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        isDefault: false,
      },
    ];

    setAddresses(mockAddresses);

    // Select default address if available
    const defaultAddress = mockAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      setShippingAddress({
        fullName: defaultAddress.fullName,
        phoneNumber: defaultAddress.phoneNumber,
        email: defaultAddress.email,
        address: defaultAddress.address,
        city: defaultAddress.city,
        state: defaultAddress.state,
        zipCode: defaultAddress.zipCode,
        country: defaultAddress.country,
      });
    }
  }, [user]);

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setShippingAddress({
        fullName: selectedAddress.fullName,
        phoneNumber: selectedAddress.phoneNumber,
        email: selectedAddress.email,
        address: selectedAddress.address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zipCode: selectedAddress.zipCode,
        country: selectedAddress.country,
      });
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    // Replace with actual API call to delete address
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
    toast.success('Address deleted successfully');

    // If the deleted address was selected, clear selection
    if (selectedAddressId === addressId) {
      setSelectedAddressId('');
    }
  };

  const handleAddNewAddress = (data: any) => {
    // Replace with actual API call to add new address
    const newAddress: Address = {
      id: Date.now().toString(), // temporary ID
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state || '',
      zipCode: data.zipCode || '',
      country: data.country || '',
      isDefault: data.isDefault || false,
    };

    setAddresses([...addresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setShippingAddress({
      fullName: newAddress.fullName,
      phoneNumber: newAddress.phoneNumber,
      email: newAddress.email,
      address: newAddress.address,
      city: newAddress.city,
      state: newAddress.state,
      zipCode: newAddress.zipCode,
      country: newAddress.country,
    });

    setIsAddingAddress(false);
    newAddressForm.reset();
    toast.success('New address added successfully');
  };

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h5 className="font-medium">Your Saved Addresses</h5>
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Icons.plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <FormWrapper form={newAddressForm} onSubmit={handleAddNewAddress}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextField label="Full Name" placeholder="Enter your full name" control={newAddressForm.control} name="fullName" required />
                <TextField
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  control={newAddressForm.control}
                  name="phoneNumber"
                  required
                />
                <TextField
                  label="Email"
                  placeholder="Enter your email"
                  control={newAddressForm.control}
                  name="email"
                  className="md:col-span-2"
                  required
                />
                <TextField
                  label="Address"
                  placeholder="Enter your address"
                  control={newAddressForm.control}
                  name="address"
                  className="md:col-span-2"
                  required
                />
                <TextField label="City" placeholder="Enter your city" control={newAddressForm.control} name="city" required />
                <TextField
                  label="State/Province"
                  placeholder="Enter your state or province"
                  control={newAddressForm.control}
                  name="state"
                />
                <TextField label="Zip/Postal Code" placeholder="Enter your zip code" control={newAddressForm.control} name="zipCode" />
                <TextField label="Country" placeholder="Enter your country" control={newAddressForm.control} name="country" />

                <div className="flex items-center space-x-2 md:col-span-2">
                  <Checkbox id="isDefault" {...newAddressForm.register('isDefault')} />
                  <label htmlFor="isDefault" className="text-sm">
                    Set as default address
                  </label>
                </div>

                <div className="flex justify-end gap-2 md:col-span-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddingAddress(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Address</Button>
                </div>
              </div>
            </FormWrapper>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-md border border-dashed p-6 text-center">
          <p className="text-gray-500">You don't have any saved addresses.</p>
          <Button variant="outline" className="mt-2" onClick={() => setIsAddingAddress(true)}>
            Add Your First Address
          </Button>
        </div>
      ) : (
        <FormWrapper form={form} onSubmit={() => {}}>
          <RadioGroup value={selectedAddressId} onValueChange={handleSelectAddress} className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`relative rounded-md border p-4 transition-all ${
                  selectedAddressId === address.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={address.id} id={`address-${address.id}`} />
                    <div>
                      <div className="flex items-center">
                        <label htmlFor={`address-${address.id}`} className="font-medium">
                          {address.fullName}
                        </label>
                        {address.isDefault && (
                          <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-primary-700 text-xs">Default</span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-600 text-sm">{address.phoneNumber}</p>
                      <p className="text-gray-600 text-sm">{address.email}</p>
                      <p className="mt-1 text-sm">
                        {address.address}, {address.city}, {address.state} {address.zipCode}, {address.country}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <Icons.trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </RadioGroup>
        </FormWrapper>
      )}

      {/* Manual address entry form - shown when no address is selected */}
      {addresses.length > 0 && !selectedAddressId && (
        <div className="mt-6">
          <h5 className="mb-4 font-medium">Or Enter a New Address</h5>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField label="Full Name" placeholder="Enter your full name" control={form.control} name="fullName" required />
            <TextField label="Phone Number" placeholder="Enter your phone number" control={form.control} name="phoneNumber" required />
            <TextField
              label="Email"
              placeholder="Enter your email"
              control={form.control}
              name="email"
              className="md:col-span-2"
              required
            />
            <TextField
              label="Address"
              placeholder="Enter your address"
              control={form.control}
              name="address"
              className="md:col-span-2"
              required
            />
            <TextField label="City" placeholder="Enter your city" control={form.control} name="city" required />
            <TextField label="State/Province" placeholder="Enter your state or province" control={form.control} name="state" />
            <TextField label="Zip/Postal Code" placeholder="Enter your zip code" control={form.control} name="zipCode" />
            <TextField label="Country" placeholder="Enter your country" control={form.control} name="country" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
