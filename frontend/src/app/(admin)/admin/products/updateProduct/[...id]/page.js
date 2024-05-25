import {fetchSCategories} from "@/services/ScategorieService"
import {fetchArticleById} from "@/services/ArticleService"
import UpdateProduct from '@/components/admin/updateProductComponent'; 
const getscategories=async()=>{ 
 const data=await fetchSCategories() 
 return data; 
} 
const getarticle=async(id)=>{ 
 const data=await fetchArticleById(id) 
 return data; 
} 
const ProductUpdatePage = async({params}) => { 
 const scategories = await getscategories(); 
 const article = await getarticle(params.id) 
 return ( 
 <div>
 <UpdateProduct article={article} scategories={scategories} />
 </div>
 ) 
} 
export default ProductUpdatePage