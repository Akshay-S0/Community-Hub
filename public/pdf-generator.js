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
                    // Create a temporary container for the receipt
                    const tempContainer = document.createElement('div');
                    tempContainer.style.cssText = `
                        background: white;
                        color: black;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                        font-size: 14px;
                        line-height: 1.6;
                        max-width: 800px;
                        margin: 0 auto;
                        box-sizing: border-box;
                    `;
                    
                    // Clone and clean up the receipt content
                    const clonedReceipt = invoice.cloneNode(true);
                    const elementsToStyle = clonedReceipt.querySelectorAll('*');
                    elementsToStyle.forEach(el => {
                        // Remove dark theme styles
                        el.style.removeProperty('background-image');
                        el.style.removeProperty('box-shadow');
                        el.style.removeProperty('backdrop-filter');
                        
                        // Set colors for PDF
                        if (el.style.color) {
                            el.style.color = 'black';
                        }
                        if (el.style.backgroundColor) {
                            el.style.backgroundColor = 'white';
                        }
                        
                        // Clean up table styles
                        if (el.tagName === 'TABLE') {
                            el.style.cssText = 'width: 100%; border-collapse: collapse; color: black; border: 1px solid #ddd;';
                        }
                        if (el.tagName === 'TD' || el.tagName === 'TH') {
                            el.style.cssText = 'padding: 8px; border: 1px solid #ddd; color: black; text-align: left;';
                        }
                    });
                    
                    tempContainer.appendChild(clonedReceipt);
                    document.body.appendChild(tempContainer);
                    
                    var opt = {
                        margin: [0.5, 0.5, 0.5, 0.5],
                        filename: 'payment_receipt.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            backgroundColor: '#ffffff'
                        },
                        jsPDF: { 
                            unit: 'in', 
                            format: 'a4', 
                            orientation: 'portrait' 
                        }
                    };
                    
                    html2pdf().set(opt).from(tempContainer).save().then(() => {
                        // Clean up
                        document.body.removeChild(tempContainer);
                        console.log('Receipt PDF generated successfully');
                    }).catch(error => {
                        console.error('Error generating receipt PDF:', error);
                        document.body.removeChild(tempContainer);
                        alert('Error generating receipt PDF. Please try again.');
                    });
                    
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
                    // Create a temporary container with clean styling
                    const tempContainer = document.createElement('div');
                    tempContainer.style.cssText = `
                        background: white;
                        color: black;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                        font-size: 12px;
                        line-height: 1.4;
                        width: 100%;
                        box-sizing: border-box;
                    `;
                    
                    // Clone the content and apply print-friendly styles
                    const clonedContent = invoice.cloneNode(true);
                    
                    // Clean up the cloned content for PDF
                    const elementsToStyle = clonedContent.querySelectorAll('*');
                    elementsToStyle.forEach(el => {
                        // Remove ALL problematic styles
                        el.style.removeProperty('background-image');
                        el.style.removeProperty('box-shadow');
                        el.style.removeProperty('backdrop-filter');
                        el.style.removeProperty('border-radius');
                        el.style.removeProperty('text-shadow');
                        el.style.removeProperty('opacity');
                        el.style.removeProperty('filter');
                        
                        // Force black text color for ALL elements
                        el.style.color = '#000000 !important';
                        el.style.setProperty('color', '#000000', 'important');
                        
                        // Remove any CSS classes that might affect visibility
                        if (el.classList.contains('text-white')) {
                            el.classList.remove('text-white');
                        }
                        if (el.classList.contains('text-light')) {
                            el.classList.remove('text-light');
                        }
                        if (el.classList.contains('text-muted')) {
                            el.classList.remove('text-muted');
                        }
                        
                        // Handle specific elements with explicit styling
                        if (el.classList.contains('content-card')) {
                            el.style.cssText = 'background: white !important; color: #000000 !important; border: 2px solid #333 !important; padding: 15px !important; margin-bottom: 10px !important;';
                        }
                        if (el.classList.contains('card-header')) {
                            el.style.cssText = 'background: #f0f0f0 !important; color: #000000 !important; padding: 10px !important; border-bottom: 2px solid #333 !important; margin-bottom: 15px !important; font-weight: bold !important;';
                        }
                        if (el.classList.contains('table')) {
                            el.style.cssText = 'width: 100% !important; border-collapse: collapse !important; color: #000000 !important; border: 2px solid #333 !important;';
                        }
                        if (el.tagName === 'TH') {
                            el.style.cssText = 'background: #d0d0d0 !important; color: #000000 !important; padding: 10px !important; border: 1px solid #333 !important; font-weight: bold !important; text-align: left !important;';
                        }
                        if (el.tagName === 'TD') {
                            el.style.cssText = 'padding: 8px 10px !important; border: 1px solid #333 !important; color: #000000 !important; background: white !important;';
                        }
                        if (el.classList.contains('info-item')) {
                            el.style.cssText = 'background: #f5f5f5 !important; color: #000000 !important; padding: 10px !important; border: 1px solid #333 !important; margin-bottom: 8px !important;';
                        }
                        if (el.classList.contains('card-title')) {
                            el.style.cssText = 'color: #000000 !important; font-weight: bold !important; font-size: 18px !important;';
                        }
                        if (el.classList.contains('card-description')) {
                            el.style.cssText = 'color: #333333 !important; font-size: 14px !important;';
                        }
                        if (el.classList.contains('value')) {
                            el.style.cssText = 'color: #000000 !important; font-weight: bold !important;';
                        }
                        if (el.tagName === 'LABEL') {
                            el.style.cssText = 'color: #000000 !important; font-weight: normal !important;';
                        }
                        
                        // Ensure headings are visible
                        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(el.tagName)) {
                            el.style.cssText = 'color: #000000 !important; font-weight: bold !important;';
                        }
                        
                        // Handle paragraphs and spans
                        if (['P', 'SPAN', 'DIV'].includes(el.tagName)) {
                            el.style.color = '#000000';
                            el.style.setProperty('color', '#000000', 'important');
                        }
                    });
                    
                    tempContainer.appendChild(clonedContent);
                    document.body.appendChild(tempContainer);
                    
                    var opt = {
                        margin: [0.5, 0.5, 0.5, 0.5],
                        filename: 'maintenance_bill.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { 
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            backgroundColor: '#ffffff',
                            scrollX: 0,
                            scrollY: 0,
                            windowWidth: 1200,
                            windowHeight: 800
                        },
                        jsPDF: { 
                            unit: 'in', 
                            format: 'a4', 
                            orientation: 'portrait',
                            compressPDF: true
                        },
                        pagebreak: { 
                            mode: ['avoid-all', 'css', 'legacy'],
                            before: '.page-break',
                            after: '.page-break'
                        }
                    };
                    
                    html2pdf().set(opt).from(tempContainer).save().then(() => {
                        // Clean up temporary container
                        document.body.removeChild(tempContainer);
                        console.log('PDF generated successfully');
                    }).catch(error => {
                        console.error('Error generating PDF:', error);
                        document.body.removeChild(tempContainer);
                        // Fallback to print dialog
                        console.log('Falling back to print dialog');
                        window.print();
                    });
                    
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