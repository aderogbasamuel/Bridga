import PageLayout from "../../components/PageLayout";
import ContactHeader from "./components/header.tsx";
function ContactPage() {
  return (
    <PageLayout title="Contact" subTitle="">
      <ContactHeader />
      <form action="">
        <div className="grid gird-cols-1 md:grid-cols-2 gap-12 p-6 md:p-12">
          <div className="border-2 rounded-[20px] px-6 py-12 flex flex-col">
            <label htmlFor="fullName" className="font-[600] text-[14px]">
              Full Name
            </label>
            <input
              type="text"
              className="bg-gray-100 border-1 p-2 border-gray-300 mb-6"
            />

            <label htmlFor="fullName" className="font-[600] text-[14px]">
              Email Address
            </label>
            <input
              type="email"
              className="bg-gray-100 border-1 p-2 border-gray-300 mb-6"
            />

            <label htmlFor="fullName" className="font-[600] text-[14px]">
              Phone Number
            </label>
            <input
              type="number"
              className="bg-gray-100 border-1 p-2 border-gray-300 mb-6"
            />

            <label htmlFor="fullName" className="font-[600] text-[14px]">
              Subject
            </label>
            <input
              type="text"
              className="bg-gray-100 border-1 p-2 border-gray-300 mb-6"
                      />
                      
            
                        <label htmlFor="fullName" className="font-[600] text-[14px]">Message</label>
                      <textarea className="bg-gray-100 border-1 p-2 border-gray-300 h-40 mb-6" />
                      <button type="submit" className="bg-black text-white w-fit p-2 px-4 uppercase font-[600] text-[14px]">Submit</button>
          </div>
        </div>
      </form>
    </PageLayout>
  );
}

export default ContactPage;
