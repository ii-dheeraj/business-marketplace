const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function fixProductStock() {
  try {
    console.log('Starting to fix product stock values...')
    
    // Get all products
    const products = await prisma.product.findMany({
      where: { isActive: true }
    })
    
    console.log(`Found ${products.length} active products`)
    
    let updatedCount = 0
    
    for (const product of products) {
      const shouldBeInStock = product.stock > 0
      
      if (product.inStock !== shouldBeInStock) {
        console.log(`Fixing product ${product.id} (${product.name}): stock=${product.stock}, inStock=${product.inStock} -> ${shouldBeInStock}`)
        
        await prisma.product.update({
          where: { id: product.id },
          data: { inStock: shouldBeInStock }
        })
        
        updatedCount++
      }
    }
    
    console.log(`Updated ${updatedCount} products`)
    
  } catch (error) {
    console.error('Error fixing product stock:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixProductStock() 