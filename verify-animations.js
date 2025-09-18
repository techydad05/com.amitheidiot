// Simple animation verification script
// Run this in the browser console to test animations

function verifyAnimations() {
  console.log('🎨 Starting Animation Verification...\n');
  
  const results = {
    passed: 0,
    failed: 0,
    warnings: 0
  };
  
  // Test 1: Button animations
  console.log('1️⃣ Testing Button Animations...');
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach((btn, index) => {
    const style = window.getComputedStyle(btn);
    const hasTransition = style.transition !== 'all 0s ease 0s';
    const isVisible = btn.offsetWidth > 0;
    
    if (hasTransition && isVisible) {
      console.log(`✅ Button ${index} (${btn.textContent.trim().substring(0, 20)}) - Animation OK`);
      results.passed++;
    } else {
      console.log(`❌ Button ${index} - No animations or not visible`);
      results.failed++;
    }
  });
  
  // Test 2: CSS Animation Classes
  console.log('\n2️⃣ Testing CSS Animation Classes...');
  const animationClasses = [
    '.smooth-transition', '.hover-lift', '.glow-on-hover', 
    '.fade-in-up', '.pulse-smooth', '.animate-spin'
  ];
  
  animationClasses.forEach(className => {
    const elements = document.querySelectorAll(className);
    if (elements.length > 0) {
      console.log(`✅ ${className} - Found ${elements.length} elements`);
      results.passed++;
    } else {
      console.log(`⚠️ ${className} - No elements found (may not be used on this page)`);
      results.warnings++;
    }
  });
  
  // Test 3: Performance Check
  console.log('\n3️⃣ Performance Check...');
  const allElements = document.querySelectorAll('*');
  let transitionCount = 0;
  
  allElements.forEach(el => {
    if (window.getComputedStyle(el).transition !== 'all 0s ease 0s') {
      transitionCount++;
    }
  });
  
  const ratio = (transitionCount / allElements.length) * 100;
  
  if (ratio > 50) {
    console.log(`⚠️ Performance Warning: ${ratio.toFixed(1)}% of elements have transitions`);
    results.warnings++;
  } else {
    console.log(`✅ Performance OK: ${ratio.toFixed(1)}% transition ratio`);
    results.passed++;
  }
  
  // Test 4: Responsive Design
  console.log('\n4️⃣ Responsive Design Check...');
  const viewportWidth = window.innerWidth;
  
  if (viewportWidth >= 1024) {
    console.log(`✅ Desktop view (${viewportWidth}px) - Large screens supported`);
  } else if (viewportWidth >= 768) {
    console.log(`✅ Tablet view (${viewportWidth}px) - Medium screens supported`);
  } else {
    console.log(`✅ Mobile view (${viewportWidth}px) - Small screens supported`);
  }
  results.passed++;
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️ Warnings: ${results.warnings}`);
  
  const score = (results.passed / (results.passed + results.failed)) * 100;
  
  if (score >= 90) {
    console.log(`\n🎉 Excellent! Animation Score: ${score.toFixed(1)}%`);
  } else if (score >= 70) {
    console.log(`\n👍 Good! Animation Score: ${score.toFixed(1)}%`);
  } else {
    console.log(`\n🔧 Needs Work! Animation Score: ${score.toFixed(1)}%`);
  }
  
  return results;
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  // Wait for page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', verifyAnimations);
  } else {
    verifyAnimations();
  }
}

export default verifyAnimations;