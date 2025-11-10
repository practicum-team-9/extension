//useEffect(() => {
//        const fetchData = async () => {
//            try {
//                const response = await fetch('YOUR_API_ENDPOINT');
//                if (!response.ok) {
//                    throw new Error(`HTTP error! status: ${response.status}`);
//                }
//                const result = await response.json();
//                setData(result);
//            } catch (error) {
//                setError(error);
//            } finally {
//                setLoading(false);
//            }
//        };
//
//        fetchData();
//    }, []);