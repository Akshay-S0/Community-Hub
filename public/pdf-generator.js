window.onload = function () {
    console.log('PDF Generator script loaded');
    
    // Test if html2pdf is available
    if (typeof html2pdf === 'undefined') {
        console.error('html2pdf library not loaded');
        return;
    }
    console.log('html2pdf library is available');
    // Download Receipt functionality
    const downloadReceiptBtn = document.getElementById("download-receipt");
    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener("click", () => {
            const invoice = document.getElementById("receipt");
            if (invoice) {
                try {
                    var opt = {
                        margin: 1,
                        filename: 'receipt.pdf',
                        image: { type: 'jpeg', quality: 1 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            allowTaint: true
                        },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    html2pdf().from(invoice).set(opt).save();
                } catch (error) {
                    console.error('Error generating receipt PDF:', error);
                    alert('Error generating receipt PDF. Please try again.');
                }
            } else {
                console.error('Receipt element not found');
                alert('Error: Receipt content not found. Please refresh the page and try again.');
            }
        });
    }
    
    // Download Bill functionality
    const downloadBtn = document.getElementById("download-btn");
    console.log('Download button found:', !!downloadBtn);
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            console.log('Download button clicked');
            const invoice = document.getElementById("print-content");
            console.log('Print content element found:', !!invoice);
            if (invoice) {
                try {
                    var opt = {
                        margin: 1,
                        filename: 'bill.pdf',
                        image: { type: 'jpeg', quality: 1 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            allowTaint: true
                        },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    };
                    html2pdf().from(invoice).set(opt).save();
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    // Fallback to print dialog
                    console.log('Falling back to print dialog');
                    window.print();
                }
            } else {
                console.error('Print content element not found');
                alert('Error: Bill content not found. Please refresh the page and try again.');
            }
        });
    }
}