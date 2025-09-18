import puppeteer from 'puppeteer';

async function testAnimations() {
  const browser = await puppeteer.launch({ 
    headless: false, 
    devtools: true,
    slowMo: 100 // Slow down actions for better visibility
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  // Navigate to the app
  console.log('🚀 Navigating to app...');
  await page.goto('http://localhost:5173');
  
  // Wait for page to load
  await page.waitForTimeout(2000);
  
  console.log('📸 Taking initial screenshot...');
  await page.screenshot({ path: 'screenshots/initial-state.png' });
  
  // Test 1: Check for console errors
  console.log('🔍 Checking console logs...');
  const logs = await page.evaluate(() => {
    return window.console._logs || [];
  });
  
  // Test 2: Test button hover animations
  console.log('🎯 Testing button animations...');
  const buttons = await page.$$('button');
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonText = await button.evaluate(el => el.textContent.trim());
    
    console.log(`  Testing button: "${buttonText}"`);
    
    // Test hover effect
    await button.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/button-${i}-hover.png` });
    
    // Test click animation (if not dangerous)
    if (!buttonText.includes('Reveal Truth')) {
      try {
        await button.click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: `screenshots/button-${i}-click.png` });
      } catch (error) {
        console.log(`    ⚠️  Click test failed: ${error.message}`);
      }
    }
    
    // Move mouse away to reset hover state
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
  }
  
  // Test 3: Check for CSS animations
  console.log('🎨 Analyzing CSS animations...');
  const animationAnalysis = await page.evaluate(() => {
    const results = {
      animatedElements: [],
      cssAnimations: [],
      transitions: [],
      errors: []
    };
    
    try {
      // Find elements with animation classes
      const elements = document.querySelectorAll('*');
      
      for (let el of elements) {
        const style = window.getComputedStyle(el);
        const classes = el.className;
        
        // Check for animation classes
        if (typeof classes === 'string') {
          const animationClasses = [
            'smooth-transition', 'hover-lift', 'glow-on-hover', 
            'animate-spin', 'fade-in', 'pulse-smooth', 'bounce-smooth'
          ];
          
          const foundClasses = animationClasses.filter(cls => classes.includes(cls));
          if (foundClasses.length > 0) {
            results.animatedElements.push({
              tag: el.tagName,
              classes: foundClasses,
              id: el.id,
              visible: el.offsetWidth > 0 && el.offsetHeight > 0
            });
          }
        }
        
        // Check computed styles
        if (style.animation !== 'none') {
          results.cssAnimations.push({
            tag: el.tagName,
            animation: style.animation,
            classes: el.className
          });
        }
        
        if (style.transition !== 'all 0s ease 0s') {
          results.transitions.push({
            tag: el.tagName,
            transition: style.transition,
            classes: el.className
          });
        }
      }
    } catch (error) {
      results.errors.push(error.message);
    }
    
    return results;
  });
  
  console.log('📊 Animation Analysis Results:');
  console.log(`  - Animated elements found: ${animationAnalysis.animatedElements.length}`);
  console.log(`  - CSS animations found: ${animationAnalysis.cssAnimations.length}`);
  console.log(`  - Elements with transitions: ${animationAnalysis.transitions.length}`);
  
  if (animationAnalysis.errors.length > 0) {
    console.log('❌ Errors found:');
    animationAnalysis.errors.forEach(error => console.log(`    ${error}`));
  }
  
  // Test 4: Test loading spinner (if present)
  console.log('🔄 Testing loading animations...');
  const spinners = await page.$$('.animate-spin, .pulse-smooth');
  console.log(`  Found ${spinners.length} spinner elements`);
  
  // Test 5: Test responsive design
  console.log('📱 Testing responsive animations...');
  const viewports = [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1200, height: 800, name: 'desktop' }
  ];
  
  for (const viewport of viewports) {
    await page.setViewport(viewport);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `screenshots/responsive-${viewport.name}.png` });
  }
  
  // Test 6: Performance analysis
  console.log('⚡ Performance analysis...');
  const performanceMetrics = await page.metrics();
  console.log('  Performance metrics:', performanceMetrics);
  
  // Generate test report
  const report = {
    timestamp: new Date().toISOString(),
    animationAnalysis,
    performanceMetrics,
    recommendations: []
  };
  
  // Add recommendations based on findings
  if (animationAnalysis.animatedElements.length === 0) {
    report.recommendations.push('No animated elements detected - check if animation classes are being applied correctly');
  }
  
  if (animationAnalysis.errors.length > 0) {
    report.recommendations.push('JavaScript errors detected - these may interfere with animations');
  }
  
  // Save report
  await page.evaluate((report) => {
    console.log('📄 Test Report:', JSON.stringify(report, null, 2));
  }, report);
  
  console.log('✅ Animation testing complete! Check the screenshots folder for visual results.');
  
  await browser.close();
  return report;
}

// Create screenshots directory
import fs from 'fs';
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

// Run the tests
testAnimations().catch(console.error);