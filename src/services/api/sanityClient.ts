import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: '4pwt957y', 
  dataset: 'production',        
  apiVersion: '2023-01-01',      
  useCdn: true,                 
})
