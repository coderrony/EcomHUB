import { connectDB } from '@/services/mongo';
import { NextResponse } from 'next/server';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToStream,
  Font,
} from '@react-pdf/renderer';
import { getOrderById, getUserById } from '@/database/queries';
import { formatDate } from '@/utils/formatDate';

// Register the Helvetica font
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
      fontWeight: 300,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
      fontWeight: 400,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
      fontWeight: 500,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
      fontWeight: 600,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
      fontWeight: 700,
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 300,
  },
  process: {
    backgroundColor: '#5ce65c',
    fontWeight: 600,
    fontSize: 9,
    color: '#FFF1DB',
    padding: 5,
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
    marginBottom: 5,
  },
  marginY: {
    marginTop: 10,
    marginBottom: 3,
  },
  border: {
    width: '100%',
    padding: 5,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: 'gray',
  },
  textBold: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 50,
    height: 50,
    objectFit: 'contain',
  },
  product: {
    width: 100,
  },
  productItem: {
    width: 60,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

// Main Invoice component
const InvoicePDF = ({ orderData, userInfo }) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.headerSection}>
          <View>
            <Text>
              ORDER ID: #{orderData._id.toString().slice(-8).toUpperCase()}
            </Text>
            <Text>
              ORDER STATUS: <Text style={styles.process}>PROCESSING</Text>
            </Text>
          </View>
          <View>
            <Text>PAYMENT AMOUNT</Text>
            <Text>TK. {orderData.totalPrice}</Text>
          </View>
        </View>
        <View style={styles.marginY}>
          <Text>
            Placed on {formatDate(orderData.createdAt)} /{' '}
            {orderData.totalProducts.length} ITEMS
          </Text>
          <Text>Order By: Cash on Delivery</Text>
        </View>
        <View style={styles.border}></View>
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>2 ITEMS</Text>
          <Text>
            Expected delivery by:{' '}
            <Text style={styles.textBold}>To be Determined</Text>
          </Text>
        </View>
        <View style={styles.border}></View>

        <View>
          <View
            style={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}>
            <View style={styles.product}>
              <Text>PRODUCT</Text>
            </View>
            <Text style={styles.productItem}>QTY</Text>
            <Text style={styles.productItem}>UNIT PRICE</Text>
            <Text style={styles.productItem}>TOTAL PRICE</Text>
          </View>
          {orderData.totalProducts.map(item => (
            <View
              key={item.id}
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.product}>
                <Image
                  src={item.image} // Ensure the product has an image URL
                  style={styles.productImage}
                  alt={item.productName}
                />
                <Text>{item.productName}</Text>
              </View>
              <Text style={styles.productItem}>{item.quantity}</Text>
              <Text style={styles.productItem}>{item.price}</Text>
              <Text style={styles.productItem}>{item.amount}</Text>
            </View>
          ))}
        </View>
        <View style={styles.border}></View>
        <View style={{ position: 'relative', width: '100%', height: 100 }}>
          <View
            style={{
              width: '35%',
              marginTop: 20,
              position: 'absolute',
              right: 0,
            }}>
            <View style={styles.headerSection}>
              <Text>SUB TOTAL:</Text>
              <Text style={{ fontWeight: 'bold' }}>
                TK {Math.round((orderData.totalPrice - 120) * 100) / 100}
              </Text>
            </View>
            <View style={styles.headerSection}>
              <Text>SHIPPING:</Text>
              <Text style={{ fontWeight: 'bold' }}>TK 120.00</Text>
            </View>
            <View style={styles.headerSection}>
              <Text>TOTAL:</Text>
              <Text style={{ fontWeight: 'bold' }}>
                TK {orderData.totalPrice}
              </Text>
            </View>
            <View style={styles.headerSection}>
              <Text>PAID:</Text>
              <Text style={{ fontWeight: 'bold' }}>TK 120.00</Text>
            </View>
            <View style={styles.headerSection}>
              <Text>DUE:</Text>
              <Text style={{ fontWeight: 'bold' }}>
                TK {Math.round(orderData.paymentHistory.dueAmount * 100) / 100}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.border}></View>

        <View
          style={{
            marginTop: 5,
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Date</Text>
            <Text style={{ marginTop: 5 }}>
              {formatDate(orderData.createdAt)}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Transaction ID</Text>
            <Text style={{ marginTop: 5 }}>
              {orderData.paymentHistory.transactionId}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Method</Text>
            <Text style={{ marginTop: 5 }}>
              {orderData.paymentHistory.paymentMethod}
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold' }}>Amount PRICE</Text>
            <Text style={{ marginTop: 5 }}> {orderData.totalPrice}</Text>
          </View>
        </View>
        <View style={styles.border}></View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>SHIPPING ADDRESS</Text>
          <Text style={{ marginTop: 5 }}>
            Name: {userInfo.firstName} {userInfo.lastName}
          </Text>
          <Text style={{ marginTop: 5 }}>Email: {userInfo.email}</Text>
          <Text style={{ marginTop: 5 }}>Phone: {userInfo.mobile.number}</Text>
          <Text style={{ marginTop: 5 }}>
            City: {userInfo.shippingAddress.city}
          </Text>
          <Text style={{ marginTop: 5 }}>
            Postal Code: {userInfo.shippingAddress.postalCode}
          </Text>
          <Text style={{ marginTop: 5, width: '50%' }}>
            Address: {userInfo.shippingAddress.address}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export const GET = async (request, { params }) => {
  const { orderId } = params;

  try {
    // console.log('pdf generator orderId ', orderId);

    const orderData = await getOrderById(orderId);

    const userInfo = await getUserById(orderData.userId);

    const stream = await renderToStream(
      <InvoicePDF orderData={orderData} userInfo={userInfo} />,
    );

    // Return the PDF as a stream with the correct content type
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="invoice.pdf"', // optional: inline or attachment
      },
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: err.message,
        status: 401,
      }),
    );
  }
};
