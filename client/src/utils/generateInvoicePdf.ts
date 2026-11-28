import { jsPDF } from 'jspdf';
import type { PlacedOrderState } from '@/pages/OrderConfirmationPage';

export function downloadOrderInvoicePdf(order: PlacedOrderState) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 44;
  const contentWidth = pageWidth - margin * 2;

  // Obsidian Top Header Banner
  doc.setFillColor(9, 9, 11);
  doc.rect(0, 0, pageWidth, 108, 'F');

  // Vermilion Accent Stripe
  doc.setFillColor(240, 78, 42);
  doc.rect(0, 108, pageWidth, 3.5, 'F');

  // Brand Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('STRIDE', margin, 48);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 188);
  doc.text('EDITORIAL PERFORMANCE FOOTWEAR', margin, 64);
  doc.text('Zurich  •  Tokyo  •  New York  •  Colombo', margin, 78);

  // Invoice Label & Number (Top Right)
  doc.setTextColor(240, 78, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('OFFICIAL TAX INVOICE', pageWidth - margin, 44, { align: 'right' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(`Order ${order.orderNumber}`, pageWidth - margin, 64, {
    align: 'right',
  });

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 188);
  doc.text(`Issued: ${formattedDate}  •  Status: PAID`, pageWidth - margin, 80, {
    align: 'right',
  });

  // Billing & Courier Info Boxes
  let y = 140;

  doc.setFillColor(247, 247, 249);
  doc.roundedRect(margin, y, contentWidth / 2 - 8, 86, 6, 6, 'F');
  doc.roundedRect(
    margin + contentWidth / 2 + 8,
    y,
    contentWidth / 2 - 8,
    86,
    6,
    6,
    'F'
  );

  // Left Box: Ship To
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 138);
  doc.text('SHIPPING & BILLING TO', margin + 14, y + 20);

  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text(order.fullName, margin + 14, y + 38);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(82, 82, 91);
  doc.text(order.street, margin + 14, y + 53);
  doc.text(`${order.city} ${order.postalCode}`, margin + 14, y + 66);
  doc.text(order.email, margin + 14, y + 79);

  // Right Box: Payment & Delivery
  const rightBoxX = margin + contentWidth / 2 + 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 138);
  doc.text('PAYMENT & COURIER', rightBoxX, y + 20);

  doc.setFontSize(11);
  doc.setTextColor(17, 17, 17);
  doc.text(`VISA Ending in ${order.cardLast4}`, rightBoxX, y + 38);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(82, 82, 91);
  doc.text('DHL Express Worldwide', rightBoxX, y + 53);
  doc.text('Tracking: #DHL-9928104', rightBoxX, y + 66);
  doc.text('Est. Delivery: Tomorrow by 6:00 PM', rightBoxX, y + 79);

  // Line Items Table Header
  y += 116;
  doc.setFillColor(9, 9, 11);
  doc.roundedRect(margin, y, contentWidth, 26, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('ITEM', margin + 12, y + 16);
  doc.text('SPECIFICATION', margin + 215, y + 16);
  doc.text('QTY', margin + 355, y + 16, { align: 'center' });
  doc.text('UNIT PRICE', margin + 425, y + 16, { align: 'right' });
  doc.text('AMOUNT', pageWidth - margin - 12, y + 16, { align: 'right' });

  // Line Items Rows
  y += 38;
  order.items.forEach((entry, index) => {
    if (index % 2 === 1) {
      doc.setFillColor(249, 249, 251);
      doc.rect(margin, y - 13, contentWidth, 28, 'F');
    }

    const lineTotal = entry.product.price * entry.quantity;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 17, 17);
    doc.text(entry.product.name, margin + 12, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 108);
    doc.text(
      `${entry.product.size ?? 'US 10'} • ${entry.product.color ?? 'Standard'}`,
      margin + 215,
      y + 4
    );
    doc.text(String(entry.quantity), margin + 355, y + 4, { align: 'center' });
    doc.text(`$${entry.product.price.toFixed(2)}`, margin + 425, y + 4, {
      align: 'right',
    });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.text(`$${lineTotal.toFixed(2)}`, pageWidth - margin - 12, y + 4, {
      align: 'right',
    });

    doc.setDrawColor(232, 232, 236);
    doc.line(margin, y + 15, pageWidth - margin, y + 15);
    y += 30;
  });

  // Totals Summary Block (Right-Aligned)
  y += 14;
  const summaryLabelX = pageWidth - margin - 165;
  const summaryValueX = pageWidth - margin - 12;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 108);
  doc.text('Subtotal', summaryLabelX, y);
  doc.setTextColor(17, 17, 17);
  doc.text(`$${order.subtotal.toFixed(2)}`, summaryValueX, y, {
    align: 'right',
  });

  y += 18;
  doc.setTextColor(100, 100, 108);
  doc.text('Express Shipping', summaryLabelX, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105);
  doc.text(
    order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`,
    summaryValueX,
    y,
    { align: 'right' }
  );

  y += 18;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 108);
  doc.text('Estimated Tax', summaryLabelX, y);
  doc.setTextColor(17, 17, 17);
  doc.text('$0.00', summaryValueX, y, { align: 'right' });

  y += 14;
  doc.setDrawColor(212, 212, 216);
  doc.line(summaryLabelX, y, pageWidth - margin, y);

  y += 22;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(9, 9, 11);
  doc.text('TOTAL PAID', summaryLabelX, y);
  doc.setTextColor(240, 78, 42);
  doc.text(`$${order.total.toFixed(2)}`, summaryValueX, y, { align: 'right' });

  // Footer Note
  const footerY = doc.internal.pageSize.getHeight() - 48;
  doc.setDrawColor(232, 232, 236);
  doc.line(margin, footerY - 14, pageWidth - margin, footerY - 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(130, 130, 138);
  doc.text(
    'Thank you for choosing STRIDE. Includes 30-day free size exchanges & 2-year carbon-plate structural warranty.',
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );
  doc.text(
    'STRIDE Editorial Footwear  •  support@stridefootwear.com',
    pageWidth / 2,
    footerY + 14,
    { align: 'center' }
  );

  const safeOrderNum = order.orderNumber.replace(/[^A-Za-z0-9-]/g, '');
  doc.save(`STRIDE-Invoice-${safeOrderNum}.pdf`);
}
