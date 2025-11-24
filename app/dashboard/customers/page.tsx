import { fetchFilteredCustomers } from "@/app/lib/data/index";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import CustomersTable from "@/app/ui/customers/table";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <CustomersTable customers={customers} />
    </div>
  );
}
