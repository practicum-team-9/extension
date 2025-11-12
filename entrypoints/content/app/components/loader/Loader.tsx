import "@/assets/tailwind.css";

export default function Loader() {
    return (
        <>
            <div className="animate-spin absolute top-[50%] left-[50%] w-20 h-20 overflow-clip rounded-full">
                <span className="absolute block w-10 h-10 bg-[#E5E5E5] top-0 left-0" />
                <span className="absolute block w-10 h-10 bg-[#89A7FF] top-0 right-0" />
                <span className="absolute block w-10 h-10 bg-[#123CA9] bottom-0 left-0" />
                <span className="absolute block w-10 h-10 bg-[#FE0808] bottom-0 right-0" />
                <span className="absolute block w-16 h-16 bg-white dark:bg-[#262626] top-2 right-2 rounded-full" />
            </div>
                
        </>
)
    
}
