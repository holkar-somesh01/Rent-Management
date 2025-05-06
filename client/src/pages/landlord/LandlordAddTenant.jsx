import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetLandlordPropertyQuery, useRegisterTenantMutation } from "../../redux/apis/landlordApi";
import { useEffect } from "react";
import { toast } from "sonner";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    mobile: z.string().optional(),
    documents: z
        .any("Upload Documents"),
    role: z.enum(["Tenant"], { required_error: "Role is required" }),
    property: z.string().min(1, "Property is required"),
    rentAmount: z.number().min(1, "Rent Amount is required"),
    leaseStart: z.string().min(1, "Lease Start is required"),
    leaseEnd: z.string().min(1, "Lease End is required"),

    // Payment Fields
    paymentMethod: z.enum(["cash", "bank transfer", "online"], { required_error: "Payment Method is required" }),
    transactionId: z.string().optional(),
    paymentDate: z.string().min(1, "Payment Date is required"),
    amountPaid: z.number().min(1, "Amount Paid is required"),
});

export default function LandlordAddTenant() {
    const [UserRegister, { data: UserData, isSuccess, isLoading, isError, error }] = useRegisterTenantMutation();
    const { data: properties, isLoading: propertyLoading } = useGetLandlordPropertyQuery();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const handleImageChange = (e) => {
        const files = e.target.files
        if (files.length > 5) {
            toast.error('You can upload up to 5 images only')
            return
        }
        setValue("documents", files)
    }
    const onSubmit = (data) => {
        console.log(data);
        console.log(data.documents);

        const formDataToSend = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "documents") {
                Array.from(value).forEach((file) => {
                    formDataToSend.append(key, file);
                });
            } else {
                formDataToSend.append(key, value);
            }
        })
        UserRegister(formDataToSend)
    }
    // const onSubmit = (data) => {
    //     const updatedFormData = new FormData();
    //     Object.keys(data).forEach(key => {
    //         if (key === 'documents') return;
    //         updatedFormData.append(key, data[key]);
    //     });
    //     UserRegister(updatedFormData);
    // };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "property") {
                const selectedProperty = properties?.find(p => p._id === value.property);
                if (selectedProperty) {
                    setValue("rentAmount", selectedProperty.rentPrice);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, properties, setValue]);

    useEffect(() => {
        setValue("role", "Tenant")
        if (isError) {
            toast.error(error?.data?.message || "User Registration Failed");
        }
        if (isSuccess) {
            toast.success(`${UserData?.role} Registered Successfully.`);
        }
    }, [isError, isSuccess]);
    return (
        <div className="p-6 mt-24 bg-white shadow-md rounded-lg mx-10">
            <h2 className="text-2xl font-semibold mb-4">Add Tenant</h2>
            {/* <pre>{JSON.stringify(properties, null, 2)}</pre> */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Name</label>
                    <input placeholder="Name" {...register("name")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.name?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input placeholder="Email" {...register("email")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.email?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Password</label>
                    <input type="password" placeholder="Password" {...register("password")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.password?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Mobile</label>
                    <input placeholder="Mobile" {...register("mobile")} className="p-3 border rounded-lg w-full" />
                </div>

                <div>
                    <label className="block font-medium mb-1">Role</label>
                    <input value={"Tenant"} type="text" {...register("role")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.role?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Property</label>
                    <select {...register("property")} className="p-3 border rounded-lg w-full">
                        <option value="">-- Choose Property --</option>
                        {propertyLoading ? <option>Loading...</option> : properties?.map(p => (
                            <option key={p._id} value={p._id}>{p.name}</option>
                        ))}
                    </select>
                    <p className="text-red-500">{errors.property?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Rent Amount</label>
                    <input type="number" placeholder="Rent Amount" {...register("rentAmount", { valueAsNumber: true })} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.rentAmount?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Lease Start</label>
                    <input type="date" {...register("leaseStart")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.leaseStart?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Lease End</label>
                    <input type="date" {...register("leaseEnd")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.leaseEnd?.message}</p>
                </div>
                <div>
                    <label className="block font-medium mb-1">Upload Documents</label>
                    <input type="file" {...register("documents")} multiple className="p-3 border rounded-lg w-full" />
                    {/* <input
                            type="file"
                            multiple
                            accept="image/*"
                            {...register('documents')}
                            // onChange={handleImageChange}
                            
                        /> */}

                    {errors.documents && (
                        <p className="text-red-500">{errors.documents.message}</p>
                    )}
                </div>

                <h3 className="col-span-2 text-xl font-semibold mt-4">Payment Details</h3>

                <div>
                    <label className="block font-medium mb-1">Payment Method</label>
                    <select {...register("paymentMethod")} className="p-3 border rounded-lg w-full">
                        <option value="">-- Select Payment Method --</option>
                        <option value="online">Online</option>
                        <option value="bank transfer">bank Transfer</option>
                        <option value="cash">Cash</option>
                    </select>
                    <p className="text-red-500">{errors.paymentMethod?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Transaction ID (Optional)</label>
                    <input placeholder="Transaction ID" {...register("transactionId")} className="p-3 border rounded-lg w-full" />
                </div>

                <div>
                    <label className="block font-medium mb-1">Payment Date</label>
                    <input type="date" {...register("paymentDate")} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.paymentDate?.message}</p>
                </div>

                <div>
                    <label className="block font-medium mb-1">Amount Paid</label>
                    <input type="number" placeholder="Amount Paid" {...register("amountPaid", { valueAsNumber: true })} className="p-3 border rounded-lg w-full" />
                    <p className="text-red-500">{errors.amountPaid?.message}</p>
                </div>

                <button type="submit" className="col-span-2 bg-blue-500 text-white p-3 rounded-lg">Submit</button>
            </form>
        </div>
    );
}
